import { PlainClient, UpsertCustomTimelineEntryInput } from '@team-plain/typescript-sdk';
import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.PLAIN_API_KEY;

if (!apiKey) {
  throw new Error('PLAIN_API_KEY environment variable is not set');
}

const client = new PlainClient({
  apiKey,
});

const customerGroupKeys = ['free-tier', 'design-partner', 'enterprise'] as const;

export type ResponseData = {
  error: string | null;
};

export type RequestBody = {
  customer: {
    name: string;
    email: string;
  };
  customeTimelineEntry: {
    title: string;
    components: UpsertCustomTimelineEntryInput['components'];
  };
  issue: {
    issueTypeId: string;
    priority: number | null;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // In production validation of the request body might be necessary.
  const body = JSON.parse(req.body) as RequestBody;

  const upsertCustomerRes = await client.upsertCustomer({
    identifier: {
      emailAddress: body.customer.email,
    },
    onCreate: {
      fullName: body.customer.name,
      customerGroupIdentifiers: [
        {
          // Here we are picking a random customer group to add the customer to
          // for demo purposes but you could use your own logic to decide which group
          // a customer should be part of.
          customerGroupKey: _.sample(customerGroupKeys),
        },
      ],
      email: {
        email: body.customer.email,
        isVerified: true,
      },
    },
    onUpdate: {},
  });

  if (upsertCustomerRes.error) {
    console.error(upsertCustomerRes.error);
    return res.status(500).json({ error: upsertCustomerRes.error.message });
  }

  console.log(`Customer upserted ${upsertCustomerRes.data.id}`);

  const upsertTimelineEntryRes = await client.upsertCustomTimelineEntry({
    customerId: upsertCustomerRes.data.id,
    title: body.customeTimelineEntry.title,
    components: body.customeTimelineEntry.components,
    changeCustomerStatusToActive: true,
  });

  if (upsertTimelineEntryRes.error) {
    console.error(upsertTimelineEntryRes.error);
    return res.status(500).json({ error: upsertTimelineEntryRes.error.message });
  }

  console.log(`Custom timeline entry upserted ${upsertTimelineEntryRes.data.timelineEntry.id}.`);

  const createIssueRes = await client.createIssue({
    customerId: upsertCustomerRes.data.id,
    issueTypeId: body.issue.issueTypeId,
    priorityValue: body.issue.priority,
  });

  if (createIssueRes.error) {
    return res.status(500).json({ error: createIssueRes.error.message });
  }

  console.log(`Issue created ${createIssueRes.data.id}`);

  res.status(200).json({ error: null });
}

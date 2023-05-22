import { inspect } from 'util';
import { PlainClient, UpsertCustomTimelineEntryInput } from '@team-plain/typescript-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.PLAIN_API_KEY;

if (!apiKey) {
  throw new Error('PLAIN_API_KEY environment variable is not set');
}

const client = new PlainClient({
  apiKey,
});

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
      email: {
        email: body.customer.email,
        isVerified: true,
      },
    },
    onUpdate: {},
  });

  if (upsertCustomerRes.error) {
    console.error(
      inspect(upsertCustomerRes.error, { showHidden: false, depth: null, colors: true })
    );
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
    console.error(
      inspect(upsertTimelineEntryRes.error, { showHidden: false, depth: null, colors: true })
    );
    return res.status(500).json({ error: upsertTimelineEntryRes.error.message });
  }

  console.log(`Custom timeline entry upserted ${upsertTimelineEntryRes.data.timelineEntry.id}.`);

  const createIssueRes = await client.createIssue({
    customerId: upsertCustomerRes.data.id,
    issueTypeId: body.issue.issueTypeId,
    priorityValue: body.issue.priority,
  });

  if (createIssueRes.error) {
    console.error(inspect(createIssueRes.error, { showHidden: false, depth: null, colors: true }));
    return res.status(500).json({ error: createIssueRes.error.message });
  }

  console.log(`Issue created ${createIssueRes.data.id}`);

  res.status(200).json({ error: null });
}

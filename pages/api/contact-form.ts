import axios from 'axios';
import { print } from 'graphql';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  ChangeCustomerStatusDocument,
  CustomerStatus,
  UpsertCustomerDocument,
  UpsertCustomTimelineEntryDocument,
} from '../../graphql/types';

const apiKey = process.env.PLAIN_API_KEY;

if (!apiKey) {
  throw new Error('PLAIN_API_KEY environment variable not set. Add it to .env.local');
}

async function request<Query, Variables>(args: {
  query: TypedDocumentNode<Query, Variables>;
  variables?: Variables;
}): Promise<Query> {
  return await axios
    .post(
      'https://core-api.uk.plain.com/graphql/v1',
      {
        query: print(args.query),
        variables: args.variables,
      },
      {
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
      }
    )
    .then((r) => {
      if (r.data.errors?.length) {
        throw r.data.errors[0];
      }

      // The first `data` is from axios, the second is from `graphql`
      return r.data.data;
    }).catch(err => {
      if (axios.isAxiosError(err) && err.response) {
        console.error(`Request failed: ${err.response.status}: ${JSON.stringify(err.response.data, null, 2)}`)
      } else {
        console.error(JSON.stringify(err, null, 2));
      }
      throw err;
    });
}

/**
 * This creates or updates a customer and returns the full customer.
 */
async function upsertCustomer(inputs: { email: string; fullName: string }) {
  const res = await request({
    query: UpsertCustomerDocument,
    variables: {
      input: {
        identifier: {
          emailAddress: inputs.email,
        },
        onCreate: {
          fullName: inputs.fullName,
          email: {
            email: inputs.email,
            isVerified: false,
          },
        },
        onUpdate: {},
      },
    },
  });

  if (res.upsertCustomer.error || !res.upsertCustomer.customer) {
    console.error(`Failed to upsert customer`, res.upsertCustomer.error);
    throw new Error(
      res.upsertCustomer.error
        ? res.upsertCustomer.error.message
        : `Failed to upsert customer for email ${inputs.email}`
    );
  }

  console.log(`Customer successfully upserted ${res.upsertCustomer.customer.id}`);
  return res.upsertCustomer.customer;
}

/**
 * This creates or updates a custom timeline entry
 */
async function upsertCustomTimelineEntry(inputs: {
  customerId: string;
  name: string;
  email: string;
  message: string;
}) {
  const res = await request({
    query: UpsertCustomTimelineEntryDocument,
    variables: {
      input: {
        customerId: inputs.customerId,
        title: 'Contact form!',
        components: [
          {
            componentText: {
              text: inputs.message,
            },
          },
        ],
      },
    },
  });

  if (!res.upsertCustomTimelineEntry.timelineEntry || res.upsertCustomTimelineEntry.error) {
    console.error(`Failed to upsert custom timeline entry`, res.upsertCustomTimelineEntry.error);
    throw new Error(
      res.upsertCustomTimelineEntry.error
        ? res.upsertCustomTimelineEntry.error.message
        : `Failed to upsert customer: ${res.upsertCustomTimelineEntry.error}`
    );
  }

  console.log(
    `Custom timeline entry successfully upserted ${res.upsertCustomTimelineEntry.timelineEntry.id}`
  );
  return res.upsertCustomTimelineEntry.timelineEntry;
}

/**
 * This changes the customer status so that they are shown in the right customer queue.
 */
async function changeCustomerStatus(inputs: { customerId: string; status: CustomerStatus }) {
  const res = await request({
    query: ChangeCustomerStatusDocument,
    variables: {
      customerId: inputs.customerId,
      status: inputs.status,
    },
  });

  if (res.changeCustomerStatusAsync.error) {
    console.error(`Failed to change customer status`, res.changeCustomerStatusAsync.error);
    throw new Error(res.changeCustomerStatusAsync.error.message);
  }

  console.log(
    `Custom status change requested for customer ${inputs.customerId} (Status: ${inputs.status})`
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  if (!data.email || !data.name || !data.message) {
    return res.status(400).send({ error: 'Email, name and message are all required.' });
  }

  try {
    // Step 1: Upsert the customer within Plain.
    const customer = await upsertCustomer({
      email: data.email,
      fullName: data.name,
    });

    // Step 2: Create a Custom Timeline Entry in the customer's timeline
    // with the contents of their contact form submission.
    const entry = await upsertCustomTimelineEntry({
      customerId: customer.id,
      name: data.name,
      email: data.email,
      message: data.message,
    });

    // Step 3: Change the customer's status to active so they enter the
    // "Waiting for help" queue.
    await changeCustomerStatus({
      customerId: customer.id,
      status: CustomerStatus.Active,
    });

    console.log(
      `Successfully created custom timeline entry ${entry.id} for customer ${customer.id}`
    );

    return res.status(200).json({ error: null });
  } catch (err) {
    return res.status(500).send({
      error: err instanceof Error ? err.message : 'Something went wrong',
    });
  }
}

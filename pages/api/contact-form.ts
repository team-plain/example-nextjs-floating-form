import { inspect } from 'util';
import { PlainClient } from '@team-plain/typescript-sdk';
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
  name: string;
  email: string;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // In production validation of the request body might be necessary.
  const body = JSON.parse(req.body) as RequestBody;

  const upsertCustomerRes = await client.upsertCustomer({
    identifier: {
      emailAddress: body.email,
    },
    onCreate: {
      fullName: body.name,
      email: {
        email: body.email,
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

  console.log(`Customer upserted ${upsertCustomerRes.data.customer.id}`);

  const createThreadRes = await client.createThread({
    customerIdentifier: {
      customerId: upsertCustomerRes.data.customer.id,
    },
    title: 'Contact form',
    components: [
      {
        componentText: {
          text: body.message,
        },
      },
    ],
  });

  if (createThreadRes.error) {
    console.error(inspect(createThreadRes.error, { showHidden: false, depth: null, colors: true }));
    return res.status(500).json({ error: createThreadRes.error.message });
  }

  console.log(`Thread created ${createThreadRes.data.id}.`);

  res.status(200).json({ error: null });
}

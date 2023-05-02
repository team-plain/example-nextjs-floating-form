import axios from 'axios';
import { print } from 'graphql';
import assert from 'assert-ts';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  ComponentInput,
  ComponentSpacerSize,
  ComponentTextColor,
  ComponentTextSize,
  CreateIssueDocument,
  CreateIssueInput,
  UpsertCustomerDocument,
  UpsertCustomTimelineEntryDocument,
  UpsertCustomTimelineEntryInput,
} from '../../graphql/types';
import { ContactFormIssue, ContactFormPayload } from '../../src/contactFormTypes';

async function request<Query, Variables>(args: {
  query: TypedDocumentNode<Query, Variables>;
  variables?: Variables;
}): Promise<Query> {
  const apiKey = process.env.PLAIN_API_KEY;

  if (!apiKey) {
    throw new Error('PLAIN_API_KEY environment variable not set. Add it to .env.local');
  }

  const apiUrl = process.env.PLAIN_CORE_API || 'https://core-api.uk.plain.com/graphql/v1';

  return await axios
    .post(
      apiUrl,
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
    })
    .catch((err) => {
      if (axios.isAxiosError(err) && err.response) {
        console.error(
          `Request failed: ${err.response.status}: ${JSON.stringify(err.response.data, null, 2)}`
        );
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
  const groupKeysString = process.env.PLAIN_CUSTOMER_GROUP_KEYS || '';
  const groupKeys = groupKeysString.split(',').map((s) => s.trim());
  const randomGroupKey = groupKeys.length
    ? groupKeys[Math.floor(Math.random() * groupKeys.length)]
    : null;

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
          customerGroupIdentifiers: randomGroupKey
            ? [
                {
                  customerGroupKey: randomGroupKey,
                },
              ]
            : undefined,
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
async function upsertCustomTimelineEntry(input: UpsertCustomTimelineEntryInput) {
  const res = await request({
    query: UpsertCustomTimelineEntryDocument,
    variables: {
      input,
    },
  });

  if (!res.upsertCustomTimelineEntry.timelineEntry || res.upsertCustomTimelineEntry.error) {
    console.error(`Failed to upsert custom timeline entry`, res.upsertCustomTimelineEntry.error);
    throw new Error(
      res.upsertCustomTimelineEntry.error
        ? res.upsertCustomTimelineEntry.error.message
        : `Failed to upsert custom timeline entry for customer: ${input.customerId}`
    );
  }

  console.log(
    `Custom timeline entry successfully upserted: ${res.upsertCustomTimelineEntry.timelineEntry.id}`
  );
  return res.upsertCustomTimelineEntry.timelineEntry;
}

async function createIssue(input: CreateIssueInput) {
  const res = await request({
    query: CreateIssueDocument,
    variables: {
      input,
    },
  });

  if (!res.createIssue.issue || res.createIssue.error) {
    console.error(`Failed to create issue`, res.createIssue.error);
    throw new Error(
      res.createIssue.error ? res.createIssue.error.message : 'Failed to create issue.'
    );
  }

  console.log(`Issue succesfully created ${res.createIssue.issue.id}`);
  return res.createIssue.issue;
}

export function isNotNull<T>(n: T | null): n is T {
  return n !== null;
}

function makeCustomTimelineEntryComponentInput(
  fields: ContactFormPayload['fields']
): ComponentInput[] {
  let input: ComponentInput[] = [];

  fields.forEach((f) => {
    switch (f.type) {
      case 'text': {
        input.push({
          componentText: {
            text: f.text,
          },
        });
        return;
      }
      case 'spacer': {
        input.push({
          componentSpacer: {
            spacerSize:
              f.size === 's'
                ? ComponentSpacerSize.S
                : f.size === 'm'
                ? ComponentSpacerSize.M
                : ComponentSpacerSize.L,
          },
        });
        return;
      }
      case 'key-value': {
        if (f.orientation === 'vertical') {
          input.push(
            {
              componentText: {
                textColor: ComponentTextColor.Muted,
                text: f.label,
              },
            },
            {
              componentSpacer: {
                spacerSize: ComponentSpacerSize.Xs,
              },
            },
            {
              componentText: {
                text: f.value,
              },
            }
          );
        } else {
          input.push({
            componentRow: {
              rowMainContent: [
                {
                  componentText: {
                    text: f.label,
                    textColor: ComponentTextColor.Muted,
                  },
                },
              ],
              rowAsideContent: [
                {
                  componentText: {
                    text: f.value,
                  },
                },
              ],
            },
          });
        }
      }
    }
  });

  return input;
}

function getIssueTypeId(contactFormIssue: ContactFormIssue) {
  const map: { [bug in ContactFormIssue['issueType']]: string } = {
    bug: process.env.PLAIN_BUG_ISSUE_TYPE_ID || '',
    demo: process.env.PLAIN_DEMO_ISSUE_TYPE_ID || '',
    security: process.env.PLAIN_SECURITY_ISSUE_TYPE_ID || '',
    question: process.env.PLAIN_QUESTION_ISSUE_TYPE_ID || '',
  };

  const issueTypeId = map[contactFormIssue.issueType];

  if (!issueTypeId) {
    throw new Error(`Issue type id not set ${contactFormIssue.issueType}`);
  }

  return issueTypeId;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const parseResult = ContactFormPayload.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).send({ error: parseResult.error.message });
  }

  const data = parseResult.data;

  try {
    // Step 1: Upsert the customer within Plain.
    const customer = await upsertCustomer({
      email: data.email,
      fullName: data.name,
    });

    // Step 2: Create a Custom Timeline Entry in the customer's timeline
    // with the contents of their contact form submission.
    await upsertCustomTimelineEntry({
      customerId: customer.id,
      title: data.title,
      changeCustomerStatusToActive: true,
      components: makeCustomTimelineEntryComponentInput(data.fields),
    });

    if (data.issue) {
      await createIssue({
        customerId: customer.id,
        issueTypeId: getIssueTypeId(data.issue),
        priorityValue:
          data.issue.priority === 'urgent'
            ? 0
            : data.issue.priority === 'high'
            ? 1
            : data.issue.priority === 'normal'
            ? 2
            : 3,
      });
    }

    return res.status(200).json({ error: null });
  } catch (err) {
    return res.status(500).send({
      error: err instanceof Error ? err.message : 'Something went wrong',
    });
  }
}

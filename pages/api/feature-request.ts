import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

async function makeApiCall(body) {
  const apiKey = process.env.PLAIN_API_KEY;
  return await axios.post(
    "https://core-api.uk.plain-development.com/graphql/v1",
    body,
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${apiKey}`,
      },
    }
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  const upsertCustomerBody = {
    query: `mutation upsertCustomer($input: UpsertCustomerInput!) {
      upsertCustomer(input: $input) {
        result
        customer {
          id
          externalId
          shortName
          fullName
          email {
            email
            isVerified
          }
          status
        }
        error {
          message
          type
          code
          fields {
            field
            message
            type
          }
        }
      }
    }`,
    variables: {
      input: {
        identifier: {
          emailAddress: "demo-customer+jack-buttons@plain.com",
        },
        onCreate: {
          fullName: "Jack Buttons",
          shortName: "Jack",
          email: {
            email: "demo-customer+jack-buttons@plain.com",
            isVerified: false,
          },
        },
        onUpdate: {},
      },
    },
  };

  let response;

  try {
    response = await makeApiCall(upsertCustomerBody);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Unexpected error" });
  }

  const upsertCustomerData = response && response.data;

  if (upsertCustomerData.data.upsertCustomer.mutationError) {
    // To read more on handling errors go to htts://docs.plain.com/
    res.status(400).json({ error: "" });
  }

  res.status(200).json({ error: null });

  const featureRequestBody = {
    query: `mutation upsertCustomTimelineEntry($input: UpsertCustomTimelineEntryInput!) {
      upsertCustomTimelineEntry(input: $input) {
          result
          timelineEntry {
              id
              customerId
              timestamp {
                  iso8601
              }
              entry {
                  ... on CustomEntry {
                      title
                      components {
                          ... on ComponentText {
                              __typename
                              text
                              textSize
                              textColor
                          }
                          ... on ComponentSpacer {
                              __typename
                              spacerSize
                          }
                          ... on ComponentDivider {
                              __typename
                              spacingSize
                          }
                          ... on ComponentLinkButton {
                              __typename
                              url
                              label
                          }
                      }
                  }
              }
              actor {
                  ... on MachineUserActor {
                      machineUser {
                          id
                          fullName
                          publicName
                      }
                  }
              }
          }
          error {
              message
              type
              code
              fields {
                  field
                  message
                  type
              }
          }
      }
  }`,
    variables: {
      input: {
        customerId: data.customer.id,
        title: "Feature Request",
        components: [
          {
            componentText: {
              text: `Request:`,
            },
          },
          {
            componentSpacer: {
              spacerSize: "S",
            },
          },
          {
            componentText: {
              text: data.message,
            },
          },
          {
            componentDivider: {
              spacingSize: "M",
            },
          },
          {
            componentText: {
              text: `How critical/important is it?`,
            },
          },
          {
            componentSpacer: {
              spacerSize: "S",
            },
          },
          {
            componentText: {
              text: data.importance,
            },
          },
        ],
      },
    },
  };

  try {
    response = await makeApiCall(featureRequestBody);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Unexpected error" });
  }

  const featureRequestData = response && response.data;

  if (featureRequestData.data.upsertCustomer.mutationError) {
    // To read more on handling errors go to htts://docs.plain.com/
    res.status(400).json({ error: "" });
  }

  return res.status(200).json({ error: null });
}

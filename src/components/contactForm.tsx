import { useEffect, useState } from 'react';
import { SelectInput } from './selectInput';
import { FormField } from './formField';
import { TextInput } from './textInput';
import styles from './contactForm.module.css';
import { Textarea } from './textarea';
import { Checkbox } from './checkbox';
import { Button } from './button';

import _ from 'lodash';

import { UAParser } from 'ua-parser-js';
import { toast } from 'react-hot-toast';
import {
  ComponentSpacerSize,
  ComponentTextColor,
  ComponentTextSize,
} from '@team-plain/typescript-sdk';
import { RequestBody } from '../../pages/api/contact-form';

const formOptions = [
  {
    label: 'Report a bug',
    value: 'bug' as const,
  },
  {
    label: 'Book a demo',
    value: 'demo' as const,
  },
  {
    label: 'Suggest a feature',
    value: 'feature' as const,
  },
  {
    label: 'Report a security issue',
    value: 'security' as const,
  },
  {
    label: 'Something else',
    value: 'question' as const,
  },
];

const demoCurrentProviderOptions = [
  { label: 'Acme', value: 'acme' as const },
  { label: 'Juniper', value: 'juniper' as const },
  { label: 'Resolve', value: 'resolve' as const },
  { label: 'Other', value: 'other' as const },
  { label: 'No, setting up for the first time', value: 'none' as const },
];

const demoExpectedVolumeOptions = [
  { label: 'I would rather not say', value: 'no' as const },
  { label: 'Up to 500/month', value: '<500' as const },
  { label: 'Up to 10,000/month', value: '<10,000' as const },
  { label: 'Up to 50,000/month', value: '<50,000' as const },
  { label: 'More than 50,000/month', value: '>50,000' as const },
];

export function ContactForm(props: { onSuccess: () => void }) {
  const [status, setStatus] = useState<'unknown' | 'loading' | 'success' | 'error'>('unknown');

  const [form, setForm] = useState<(typeof formOptions)[number]['value'] | null>(null);
  const [name, setFullName] = useState('Grace');
  const [email, setEmailAddress] = useState('grace@gmail.com');

  // Bug form
  const [bugDescription, setBugDescription] = useState('');
  const [bugIsBlocking, setBugIsBlocking] = useState(false);

  // Feature request
  const [featureRequest, setFeatureRequest] = useState('');

  // Demo form
  const [demoCurrentProvider, setDemoCurrentProvider] = useState<string>('');
  const [demoExpectedVolume, setDemoExpectedVolume] = useState<
    (typeof demoExpectedVolumeOptions)[number]['value']
  >(demoExpectedVolumeOptions[0].value);
  const [demoMessage, setDemoMessage] = useState('');

  // Question
  const [question, setQuestion] = useState('');

  // Security
  const [securityIssue, setSecurityIssue] = useState('');

  function getCustomTimelineEntry(): RequestBody['customeTimelineEntry'] {
    if (!form) {
      throw new Error('form not set');
    }

    switch (form) {
      case 'bug': {
        const parser = new UAParser(window.navigator.userAgent);
        const browser = parser.getBrowser();
        return {
          title: 'Bug report',
          components: [
            {
              componentText: {
                text: bugDescription,
              },
            },
            {
              componentSpacer: {
                spacerSize: ComponentSpacerSize.S,
              },
            },
            {
              componentText: {
                text: `Reported on ${window.location.href} using ${browser.name} (${browser.version})`,
                textSize: ComponentTextSize.S,
                textColor: ComponentTextColor.Muted,
              },
            },
          ],
        };
      }
      case 'feature': {
        return {
          title: 'Feature request',
          components: [
            {
              componentText: {
                text: featureRequest,
              },
            },
          ],
        };
      }
      case 'question': {
        return {
          title: 'General question',
          components: [
            {
              componentText: {
                text: question,
              },
            },
          ],
        };
      }
      case 'security': {
        return {
          title: 'Security report',
          components: [
            {
              componentText: {
                text: securityIssue,
              },
            },
          ],
        };
      }
      case 'demo': {
        return {
          title: 'Demo request',
          components: [
            ...(demoMessage
              ? [
                  {
                    componentText: {
                      text: demoMessage,
                    },
                  },
                  {
                    componentSpacer: {
                      spacerSize: ComponentSpacerSize.S,
                    },
                  },
                ]
              : []),
            {
              componentRow: {
                rowMainContent: [
                  {
                    componentText: {
                      text: 'Current provider',
                      color: ComponentTextColor.Muted,
                    },
                  },
                ],
                rowAsideContent: [
                  {
                    componentText: {
                      text:
                        demoCurrentProviderOptions.find((o) => o.value === demoCurrentProvider)
                          ?.label || '',
                    },
                  },
                ],
              },
            },
            {
              componentRow: {
                rowMainContent: [
                  {
                    componentText: {
                      text: 'Expected volume',
                      color: ComponentTextColor.Muted,
                    },
                  },
                ],
                rowAsideContent: [
                  {
                    componentText: {
                      text:
                        demoExpectedVolumeOptions.find((o) => o.value === demoExpectedVolume)
                          ?.label || '',
                    },
                  },
                ],
              },
            },
          ],
        };
      }
    }
  }

  function getIssue(): RequestBody['issue'] {
    if (!form) {
      throw new Error('form not set');
    }
    const issueTypeIds = {
      bug: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_BUG || '',
      demo: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_DEMO || '',
      feature: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_FEATURE || '',
      security: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_SECURITY || '',
      question: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_QUESTION || '',
    } as const;

    const issueTypeId = issueTypeIds[form];

    if (!issueTypeId) {
      throw new Error(`No issue type id defined for form "${form}"`);
    }

    return {
      issueTypeId,
      // In this example contact form if an issue is blocking the user than we want
      // to make sure the created issue is urgent. Otherwise we're ok with the default
      // which is set per issue type in the Plain settings.
      priority: form === 'bug' && bugIsBlocking ? 1 : null,
    };
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    const body: RequestBody = {
      customer: {
        name,
        email,
      },
      customeTimelineEntry: getCustomTimelineEntry(),
      issue: getIssue(),
    };

    fetch('/api/contact-form/', {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          setStatus('error');
        } else {
          setStatus('success');
        }
      })
      .catch(function (error) {
        console.error(error);
        setStatus('error');
      });
  }

  useEffect(() => {
    if (status === 'success') {
      toast.success('Nice!');
    }
    if (status === 'error') {
      toast.error('Oops');
    }
  }, [status]);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Get in touch</h2>
        <p className={styles.description}>We do are best to get back to you in 24h.</p>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.basicDetails}>
          <FormField label="Your name">
            <TextInput value={name} onChange={setFullName} placeholder="e.g. Grace Hoppper" />
          </FormField>
          <FormField label="Your email">
            <TextInput
              value={email}
              onChange={setEmailAddress}
              placeholder="e.g. grace@nasa.gov.uk"
            />
          </FormField>
        </div>
        <FormField label="What do you need help with?">
          <SelectInput
            options={formOptions}
            onChange={setForm}
            value={form}
            placeholder="What you need help with"
          />
        </FormField>

        {form === 'bug' && (
          <>
            <FormField
              label="What did you find?"
              helpText="The more descriptive the better. We _love_ fixing bugs but we need to be able to reproduce them first."
            >
              <Textarea
                value={bugDescription}
                onChange={setBugDescription}
                placeholder="When I..."
              />
            </FormField>
            <FormField label="Is this really bad?">
              <Checkbox
                label="Yes, this is preventing me from using Liveblocks."
                isChecked={bugIsBlocking}
                onChange={setBugIsBlocking}
              />
            </FormField>
          </>
        )}

        {form === 'demo' && (
          <>
            <FormField label="Are you currently using another provider?">
              <SelectInput
                options={demoCurrentProviderOptions}
                value={demoCurrentProvider}
                placeholder="Current provider"
                onChange={setDemoCurrentProvider}
              />
            </FormField>
            <FormField label="How many API calls do you think expect to make?">
              <SelectInput
                placeholder="Expected transaction volume"
                options={demoExpectedVolumeOptions}
                value={demoExpectedVolume}
                onChange={setDemoExpectedVolume}
              />
            </FormField>
            <FormField
              label="Anything else we should know?"
              helpText="Anything you want to make sure we run through in our demo for example?"
            >
              <Textarea
                value={demoMessage}
                onChange={setDemoMessage}
                placeholder={`e.g. "I'd love to invite Jon at jon-the-cto@acme.com"`}
              />
            </FormField>
          </>
        )}

        {form === 'question' && (
          <>
            <FormField label="What's on your mind?">
              <Textarea
                value={question}
                onChange={setQuestion}
                placeholder="Enter your question…"
              />
            </FormField>
          </>
        )}

        {form === 'feature' && (
          <>
            <FormField label="What's your idea?">
              <Textarea
                value={featureRequest}
                onChange={setFeatureRequest}
                placeholder="It would be great if…"
              />
            </FormField>
          </>
        )}

        {form === 'security' && (
          <>
            <FormField
              label="What did you find?"
              helpText="We will get back to you, at the latest, in 48 hours."
            >
              <Textarea value={securityIssue} onChange={setSecurityIssue} placeholder="When I…" />
            </FormField>
          </>
        )}

        <Button
          label="Submit"
          onClick={() => {}}
          isLoading={false}
          isDisabled={status === 'loading' || !form}
        />
      </form>
    </div>
  );
}

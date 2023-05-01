import { useEffect, useState } from 'react';
import { SelectInput } from './selectInput';
import { FormField } from './formField';
import { TextInput } from './textInput';
import styles from './contactForm.module.css';
import { Textarea } from './textarea';
import { Checkbox } from './checkbox';
import { Button } from './button';
import { ContactFormPayload } from '../contactFormTypes';
import { useContactForm } from '../useContactForm';

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
    label: 'Request a refund',
    value: 'refund' as const,
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
  { label: 'Gumroad', value: 'gumroad' as const },
  { label: 'Stripe', value: 'stripe' as const },
  { label: 'Paddle', value: 'paddle' as const },
  { label: 'Other', value: 'other' as const },
  { label: 'No, setting up for the first time', value: 'none' as const },
];

const demoExpectedTransactionVolumeOptions = [
  { label: 'I would rather not say', value: 'no' as const },
  { label: 'Up to $500/month', value: '<$500' as const },
  { label: 'Up to $10,000/month', value: '<$10,000' as const },
  { label: 'Up to $50,000/month', value: '<$50,000' as const },
  { label: 'More than $50,000/month', value: '>$50,000' as const },
];

export function ContactForm(props: { onSuccess: () => void }) {
  const { submit, status, reset } = useContactForm();

  const [form, setForm] = useState<(typeof formOptions)[number]['value'] | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Bug form
  const [bugDescription, setBugDescription] = useState('');
  const [bugIsBlocking, setBugIsBlocking] = useState(false);

  // Demo form
  const [demoCurrentProvider, setDemoCurrentProvider] = useState<string | null>(null);
  const [demoTransactionValue, setDemoTransactionValue] = useState<
    (typeof demoExpectedTransactionVolumeOptions)[number]['value'] | null
  >(null);
  const [demoMessage, setDemoMessage] = useState('');

  // Question
  const [question, setQuestion] = useState('');

  // Security
  const [securityIssue, setSecurityIssue] = useState('');

  function createContactFormPayload(): ContactFormPayload | null {
    if (!form || form === 'refund') {
      return null;
    }

    const commonFields = { name, email };

    switch (form) {
      case 'bug': {
        return {
          ...commonFields,
          title: 'Bug report',
          fields: [
            {
              type: 'text',
              text: bugDescription,
            },
          ],
          issue: {
            issueType: 'bug',
            priority: bugIsBlocking ? 'high' : 'normal',
          },
        };
      }
      case 'demo': {
        return {
          ...commonFields,
          title: 'Demo request',
          fields: [
            {
              type: 'key-value',
              label: 'Currently',
              value:
                demoCurrentProviderOptions.find((o) => o.value === demoCurrentProvider)?.label ||
                '',
            },
            {
              type: 'spacer',
              size: 's',
            },
            {
              type: 'key-value',
              label: 'Expected transaction volume',
              value:
                demoExpectedTransactionVolumeOptions.find((o) => o.value === demoTransactionValue)
                  ?.label || '',
            },
            {
              type: 'spacer',
              size: 'm',
            },
            {
              type: 'key-value',
              label: 'Additional message:',
              orientation: 'vertical',
              value: demoMessage,
            },
          ],
          issue: {
            issueType: 'demo',
            priority: 'high',
          },
        };
      }
      case 'security': {
        return {
          ...commonFields,
          title: 'Security issue report',
          fields: [
            {
              type: 'text',
              text: securityIssue,
            },
          ],
          issue: {
            issueType: 'security',
            priority: 'urgent',
          },
        };
      }
      case 'question': {
        return {
          ...commonFields,
          title: 'General question',
          fields: [
            {
              type: 'text',
              text: question,
            },
          ],
          issue: null,
        };
      }
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = createContactFormPayload();

    if (!payload) {
      return;
    }

    submit(payload);
  }

  const { onSuccess } = props;

  useEffect(() => {
    if (status === 'success') {
      reset();
      onSuccess();
    }
  }, [status, reset, onSuccess]);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Get in touch</h2>
        <p className={styles.description}>We do are best to get back to you in 24h.</p>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.basicDetails}>
          <FormField label="Your name">
            <TextInput value={name} onChange={setName} placeholder="e.g. Grace Hoppper" />
          </FormField>
          <FormField label="Your email">
            <TextInput value={email} onChange={setEmail} placeholder="e.g. grace@nasa.gov.uk" />
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
                placeholder="e.g. grace@nasa.gov.uk"
              />
            </FormField>
            <FormField label="Is this really bad?">
              <Checkbox
                label="Yes, this is preventing me from accepting payments or getting paid."
                isChecked={bugIsBlocking}
                onChange={setBugIsBlocking}
              />
            </FormField>
          </>
        )}

        {form === 'demo' && (
          <>
            <FormField label="Are you currently using a payment provider?">
              <SelectInput
                options={demoCurrentProviderOptions}
                value={demoCurrentProvider}
                placeholder="Current payment provider"
                onChange={setDemoCurrentProvider}
              />
            </FormField>
            <FormField label="What transaction volume are you expecting">
              <SelectInput
                placeholder="Expected transaction volume"
                options={demoExpectedTransactionVolumeOptions}
                value={demoTransactionValue}
                onChange={setDemoTransactionValue}
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

        {form === 'refund' && (
          <>
            <p className={styles.paragraph}>
              Lemon Squeezy is a payment platform used by many different merchants to sell digital
              goods.
            </p>
            <p className={styles.paragraph}>
              We allow all sellers to refund their own purchases but do not make that decision for
              them. If you think you deserve a refund please get in touch with the store you
              purchased from.
            </p>
          </>
        )}

        {form === 'security' && (
          <>
            <FormField
              label="What did you find?"
              helpText="We will get back to you, at the latest, in 48 hours."
            >
              <Textarea
                value={securityIssue}
                onChange={setSecurityIssue}
                placeholder="e.g. grace@nasa.gov.uk"
              />
            </FormField>
          </>
        )}

        {form !== 'refund' && (
          <Button
            label="Submit"
            onClick={() => {}}
            isLoading={false}
            isDisabled={status === 'loading'}
          />
        )}
      </form>
    </div>
  );
}

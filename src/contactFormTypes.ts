import { z } from 'zod';

export const ContactFormTextRowField = z.object({
  type: z.literal('key-value'),
  label: z.string(),
  value: z.string(),
  orientation: z.enum(['vertical', 'horizontal']).default('vertical').optional(),
});
export type ContactFormTextRowField = z.infer<typeof ContactFormTextRowField>;

export const ContactFormTextField = z.object({
  type: z.literal('text'),
  text: z.string(),
});
export type ContactFormTextField = z.infer<typeof ContactFormTextField>;

export const ContactFormSpacer = z.object({
  type: z.literal('spacer'),
  size: z.enum(['s', 'm', 'l']),
});
export type ContactFormSpacer = z.infer<typeof ContactFormSpacer>;

export const ContactFormIdField = z.object({
  type: z.literal('id'),
  id: z.string(),
});
export type ContactFormIdField = z.infer<typeof ContactFormIdField>;

export const ContactFormIssue = z.object({
  issueType: z.enum(['bug', 'demo', 'security', 'question']),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),
});
export type ContactFormIssue = z.infer<typeof ContactFormIssue>;

export const ContactFormPayload = z.object({
  name: z.string(),
  email: z.string(),
  title: z.string(),
  fields: z.array(
    z.union([ContactFormTextField, ContactFormIdField, ContactFormTextRowField, ContactFormSpacer])
  ),
  issue: ContactFormIssue.nullable().default(null),
});
export type ContactFormPayload = z.infer<typeof ContactFormPayload>;

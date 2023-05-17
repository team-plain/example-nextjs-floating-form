import { RequestBody } from '../pages/api/contact-form';
import { FormType } from './components/contactForm';

export function getIssue(formType: FormType, bugIsBlocking: boolean): RequestBody['issue'] {
  if (!formType) {
    throw new Error('form not set');
  }
  const issueTypeIds = {
    bug: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_BUG || '',
    demo: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_DEMO || '',
    feature: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_FEATURE || '',
    security: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_SECURITY || '',
    question: process.env.NEXT_PUBLIC_PLAIN_ISSUE_TYPE_ID_QUESTION || '',
  } as const;

  const issueTypeId = issueTypeIds[formType];

  if (!issueTypeId) {
    throw new Error(`No issue type id defined for form "${formType}"`);
  }

  return {
    issueTypeId,
    // In this example contact form if an issue is blocking the user than we want
    // to make sure the created issue is urgent. Otherwise we're ok with the default
    // which is set per issue type in the Plain settings.
    priority: formType === 'bug' && bugIsBlocking ? 1 : null,
  };
}

import axios from 'axios';
import { ContactFormPayload } from './contactFormTypes';
import { useCallback, useState } from 'react';

type RequestStatus = 'unknown' | 'loading' | 'success' | 'failure';

export function useContactForm() {
  const [status, setStatus] = useState<RequestStatus>('unknown');

  const submit = async (contactFormPayload: ContactFormPayload) => {
    if (status === 'loading') {
      // One at at a time.
      return;
    }

    setStatus('loading');
    try {
      const res = await axios.post('/api/contact-form', contactFormPayload);
      setStatus('success');
    } catch (e) {
      setStatus('failure');
      if (axios.isAxiosError(e) && e.response) {
        console.error(
          `Request failed: ${e.response.status} ${JSON.stringify(e.response.data, null, 2)}`
        );
        return;
      } else {
        throw e;
      }
    }
  };

  const reset = useCallback(() => {
    if (status === 'loading') {
      // don't support cancelling in-flight requests
      return;
    }
    setStatus('unknown');
  }, [status]);

  return {
    submit,
    status,
    reset,
  };
}

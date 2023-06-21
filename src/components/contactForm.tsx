import { useState } from 'react';
import { FormField } from './formField';
import { TextInput } from './textInput';
import styles from './contactForm.module.css';
import { Textarea } from './textarea';
import { Button } from './button';

import { toast } from 'react-hot-toast';
import { RequestBody } from '../../pages/api/contact-form';

export function ContactForm(props: { onSubmit: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const body: RequestBody = {
      name,
      email,
      message,
    };

    try {
      const result = await fetch('/api/contact-form/', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (result.ok) {
        props.onSubmit();
        toast.success("Nice, we'll be in touch shortly!");
      } else {
        toast.error('Oops');
      }
    } catch (error) {
      console.error(error);
      toast.error('Oops');
    }

    setIsLoading(false);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormField label="Your name">
        <TextInput value={name} onChange={setName} placeholder="e.g. Mr. Robot" />
      </FormField>

      <FormField label="Your email">
        <TextInput
          value={email}
          onChange={setEmailAddress}
          placeholder="e.g. elliot@protonmail.com"
        />
      </FormField>

      <FormField label="Your message">
        <Textarea value={message} onChange={setMessage} placeholder={`Hi there, do you...`} />
      </FormField>

      <Button label="Send" isLoading={isLoading} isDisabled={isLoading} />
    </form>
  );
}

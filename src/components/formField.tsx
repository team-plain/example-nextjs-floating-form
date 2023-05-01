import * as React from 'react';
import styles from './formField.module.css';

export interface FormFieldProps {
  label?: string;
  labelFor?: string;
  helpText?: string | null;
  errorMessage?: string | null;
  children: React.ReactNode;
}

export const FormField = (props: FormFieldProps) => (
  <div>
    {props.label && (
      <label className={styles.label} htmlFor={props.labelFor}>
        {props.label}
      </label>
    )}
    {props.helpText && <span className={styles.helpText}>{props.helpText}</span>}
    <div>{props.children}</div>
  </div>
);

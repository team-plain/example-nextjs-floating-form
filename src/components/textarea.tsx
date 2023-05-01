import styles from './texarea.module.css';

export interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      className={styles.textarea}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => {
        props.onChange(e.currentTarget.value);
      }}
    />
  );
}

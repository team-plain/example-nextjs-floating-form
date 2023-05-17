import styles from './textInput.module.css';

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function TextInput(props: TextInputProps) {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      required={true}
      onChange={(e) => {
        props.onChange(e.currentTarget.value);
      }}
    />
  );
}

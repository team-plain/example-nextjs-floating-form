import styles from './button.module.css';

interface ButtonProps {
  label: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button type="submit" className={styles.button} disabled={props.isDisabled}>
      {props.isLoading && <span className={styles.spinner} />}
      <span style={{ opacity: props.isLoading ? 0 : 1 }}>{props.label}</span>
    </button>
  );
}

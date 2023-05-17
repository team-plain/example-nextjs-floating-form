import styles from './button.module.css';

interface ButtonProps {
  label: string;
  isLoading: boolean;
  isDisabled: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button type="submit" className={styles.button} disabled={props.isDisabled}>
      {props.label}
    </button>
  );
}

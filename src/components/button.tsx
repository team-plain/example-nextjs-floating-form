import styles from './button.module.css';

interface ButtonProps {
  label: string;
  isLoading: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={styles.button} disabled={props.isDisabled}>
      {props.label}
    </button>
  );
}

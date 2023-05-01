import * as CheckboxLib from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import styles from './checkbox.module.css';

export interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <label className={styles.label}>
      <CheckboxLib.Root
        checked={props.isChecked}
        onCheckedChange={props.onChange}
        className={styles.checkbox}
      >
        <CheckboxLib.Indicator>
          <CheckIcon />
        </CheckboxLib.Indicator>
      </CheckboxLib.Root>
      {props.label}
    </label>
  );
}

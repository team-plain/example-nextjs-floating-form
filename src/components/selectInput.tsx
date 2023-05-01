import * as Select from '@radix-ui/react-select';
import styles from './selectInput.module.css';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export type SelectOption<T extends string> = {
  label: string;
  value: T;
};

export interface SelectProps<T extends string> {
  value: T | null;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder: string;
}

export function SelectInput<T extends string>(props: SelectProps<T>) {
  return (
    <Select.Root value={props.value || undefined} onValueChange={props.onChange}>
      <Select.Trigger className={styles.select}>
        <Select.Value placeholder={props.placeholder} />
        <Select.Icon className={styles.icon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className={styles.content} position="popper" sideOffset={8}>
        <Select.Viewport>
          {props.options.map((opt) => {
            return (
              <Select.Item value={opt.value} key={opt.value} className={styles.item}>
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            );
          })}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}

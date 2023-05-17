import * as Select from '@radix-ui/react-select';
import styles from './selectInput.module.css';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

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
  // Key is to fix bug with radix-ui/react-select
  // https://github.com/radix-ui/primitives/issues/1569
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (props.value === null) {
      setKey((k) => k + 1);
    }
  }, [props.value]);

  return (
    <Select.Root key={key} value={props.value || undefined} onValueChange={props.onChange}>
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

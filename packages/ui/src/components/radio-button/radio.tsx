import clsx from 'clsx';
import radioButtonStyles from './radio.module.css';
import radioButtonSizeStyles from './radio-size.module.css';

import { InputHTMLAttributes } from 'react';
import { SelectorSize } from '@ui/shared/types/selector-size';

type Props = {
  size?: SelectorSize;
  checked?: boolean;
  name: string;
  value: string | number;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'value' | 'name'
>;

export function Radio({
  size = 'medium',
  className,
  checked,
  name,
  value,
  onChange,
  ...props
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
  }

  return (
    <label className={radioButtonStyles['wrapper']}>
      <input
        type="radio"
        className={clsx(
          radioButtonStyles['radio'],
          radioButtonSizeStyles[size],
          className,
        )}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
    </label>
  );
}

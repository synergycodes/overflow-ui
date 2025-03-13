import clsx from 'clsx';
import styles from './radio.module.css';
import './variables.css';

import { InputHTMLAttributes } from 'react';
import { Size } from '../shared/types/label-size';

type Props = {
  size?: Size;
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
    <label className={styles['wrapper']}>
      <input
        type="radio"
        className={clsx(styles['radio'], styles[size], className)}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
    </label>
  );
}

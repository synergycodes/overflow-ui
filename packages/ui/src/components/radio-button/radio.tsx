import clsx from 'clsx';
import radioButtonStyles from './radio.module.css';
import radioButtonSizeStyles from './radio-size.module.css';

import { InputHTMLAttributes } from 'react';
import { SelectorSize } from '@ui/shared/types/selector-size';

type Props = {
  /** The size of the radio button */
  size?: SelectorSize;
  /** Whether the radio button is checked */
  checked?: boolean;
  /** The name of the radio button group */
  name: string;
  /** The value of the radio button */
  value: string | number;
  /** Callback fired when the radio button state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional class name for the container element */
  classNameContainer?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'value' | 'name'
>;

/**
 * A radio button component that allows users to select a single option from a group.
 */
export function Radio({
  size = 'medium',
  className,
  checked,
  name,
  value,
  onChange,
  classNameContainer,
  ...props
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
  }

  return (
    <label className={clsx(radioButtonStyles['container'], classNameContainer)}>
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

import clsx from 'clsx';
import inputFontStyles from '@/axiom/shared/styles/input-font-size.module.css';
import inputSizeStyles from '@/axiom/shared/styles/input-size.module.css';
import styles from './date-picker.module.css';
import './data-picker-mantine.css';

import { DatePickerInput } from '@mantine/dates';
import { forwardRef } from 'react';
import { DatePickerProps } from './types';

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      inputSize = 'medium',
      valueFormat = 'DD/MM/YYYY',
      placeholder = 'dd/mm/yyyy',
      ...props
    },
    ref,
  ) => (
    <DatePickerInput
      {...props}
      ref={ref}
      valueFormat={valueFormat}
      placeholder={placeholder}
      classNames={{
        input: clsx(
          inputFontStyles[inputSize],
          inputSizeStyles[inputSize],
          styles['container'],
        ),
      }}
    />
  ),
);

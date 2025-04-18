import clsx from 'clsx';
import inputFontStyles from '@ui/shared/styles/input-font-size.module.css';
import inputSizeStyles from '@ui/shared/styles/input-size.module.css';
import styles from './date-picker.module.css';
import './data-picker-mantine.css';

import {
  DatePickerInput,
  type DatePickerType,
  type DateValue,
} from '@mantine/dates';
import { forwardRef } from 'react';
import type { DatePickerProps } from './types';
import { MantineProvider } from '@mantine/core';
type Props = DatePickerProps & {
  /**
   * Format string to control how the selected date is displayed
   * (e.g., 'yyyy-MM-dd')
   */
  valueFormat?: string;
  /**
   * Placeholder text to show when no date is selected
   */
  placeholder?: string;
  /**
   * Picker type
   */
  type?: DatePickerType;
  /**
   * Default date value when the component is initially rendered.
   *
   * For the "default" is a single date, for the "range" [date, date]; and for the "multiple", an array of dates.
   */
  defaultValue?: DatePickerProps['defaultValue'];
  /**
   * Controlled value for the selected date
   *
   * For the "default" is a single date, for the "range" [date, date]; and for the "multiple", an array of dates.
   */
  value?: DatePickerProps['value'];
  /**
   * Whether the date picker has an error
   */
  error?: boolean;
};

/**
 * Component for selecting a date with customizable format and placeholder
 */
export const DatePicker = forwardRef<HTMLButtonElement, Props>(
  (
    {
      inputSize = 'medium',
      valueFormat = 'DD/MM/YYYY',
      placeholder = 'dd/mm/yyyy',
      type = 'default',
      value,
      error = false,
      ...props
    },
    ref,
  ) => {
    return (
      <MantineProvider>
        <DatePickerInput
          {...props}
          type={type}
          ref={ref}
          value={normalizeDateValue(value)}
          valueFormat={valueFormat}
          placeholder={placeholder}
          classNames={{
            input: clsx(
              inputFontStyles[inputSize],
              inputSizeStyles[inputSize],
              styles['container'],
              {
                [styles['container--error']]: error,
              },
            ),
          }}
        />
      </MantineProvider>
    );
  },
);

function normalizeDateValue(value: unknown): DateValue | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string') {
    return new Date(value);
  }

  return undefined;
}

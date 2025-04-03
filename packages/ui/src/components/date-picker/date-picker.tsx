import clsx from "clsx";
import inputFontStyles from "@ui/shared/styles/input-font-size.module.css";
import inputSizeStyles from "@ui/shared/styles/input-size.module.css";
import styles from "./date-picker.module.css";
import "./data-picker-mantine.css";

import { DatePickerInput, DateValue } from "@mantine/dates";
import { forwardRef } from "react";
import { DatePickerProps } from "./types";
import { MantineProvider } from "@mantine/core";

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      inputSize = "medium",
      valueFormat = "DD/MM/YYYY",
      placeholder = "dd/mm/yyyy",
      value,
      ...props
    },
    ref
  ) => (
    <MantineProvider>
      <DatePickerInput
        {...props}
        ref={ref}
        value={normalizeDateValue(value)}
        valueFormat={valueFormat}
        placeholder={placeholder}
        classNames={{
          input: clsx(
            inputFontStyles[inputSize],
            inputSizeStyles[inputSize],
            styles["container"]
          ),
        }}
      />
    </MantineProvider>
  )
);

function normalizeDateValue(value: unknown): DateValue | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value; 
  }

  if (typeof value === "string") {
    return new Date(value);
  }

  return undefined;
}

import clsx from "clsx";
import inputFontStyles from "@ui/shared/styles/input-font-size.module.css";
import inputSizeStyles from "@ui/shared/styles/input-size.module.css";
import styles from "./date-picker.module.css";
import "./data-picker-mantine.css";

import { DatePickerInput } from "@mantine/dates";
import { forwardRef } from "react";
import { DatePickerProps } from "./types";
import { MantineProvider } from "@mantine/core";

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      inputSize = "medium",
      valueFormat = "DD/MM/YYYY",
      placeholder = "dd/mm/yyyy",
      ...props
    },
    ref,
  ) => (
    <MantineProvider>
      <DatePickerInput
        {...props}
        ref={ref}
        valueFormat={valueFormat}
        placeholder={placeholder}
        classNames={{
          input: clsx(
            inputFontStyles[inputSize],
            inputSizeStyles[inputSize],
            styles["container"],
          ),
        }}
      />
    </MantineProvider>
  ),
);

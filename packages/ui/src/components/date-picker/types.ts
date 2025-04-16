import type { DatePickerInputProps, DatePickerType } from '@mantine/dates';
import type { ItemSize } from '@ui/shared/types/item-size';

export type DatePickerProps = DatePickerInputProps<DatePickerType> & {
  inputSize?: ItemSize;
};

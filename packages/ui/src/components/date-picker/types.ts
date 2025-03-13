import { DatePickerInputProps, DatePickerType } from '@mantine/dates';
import { Size } from '@/axiom/shared/types/label-size';

export type DatePickerProps = DatePickerInputProps<DatePickerType> & {
  inputSize?: Size;
};

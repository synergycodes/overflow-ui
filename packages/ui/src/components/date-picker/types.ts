import { DatePickerInputProps, DatePickerType } from "@mantine/dates";
import { ItemSize } from "@ui/shared/types/item-size";

export type DatePickerProps = DatePickerInputProps<DatePickerType> & {
  inputSize?: ItemSize;
};

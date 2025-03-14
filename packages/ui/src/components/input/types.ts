import { InputProps as InputBaseProps } from "@mui/base";
import { ItemSize } from "@ui/shared/types/item-size";

export type InputProps = InputBaseProps & {
  searchIcon?: boolean;
  onClear?: () => void;
  size?: ItemSize;
};

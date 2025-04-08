import { InputProps as InputBaseProps } from '@mui/base';
import { ItemSize } from '@ui/shared/types/item-size';

export type InputProps = InputBaseProps & {
  /**
   * Specifies the size of the input field.
   * Can be 'small', 'medium', or 'large'.
   */
  size?: ItemSize;
};

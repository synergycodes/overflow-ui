import { InputProps as InputBaseProps } from '@mui/base';
import { ItemSize } from '@ui/shared/types/item-size';

export type InputProps = InputBaseProps & {
  /**
   * If true, displays a search icon.
   */

  searchIcon?: boolean;
  /**
   * Callback function executed after the clear action.
   * If provided, a cross icon will be displayed.
   */

  onClear?: () => void;
  /**
   * Defines the size of the input.
   */
  size?: ItemSize;
};

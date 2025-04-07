import { InputProps as InputBaseProps } from '@mui/base';
import { ItemSize } from '@ui/shared/types/item-size';
import { ReactNode } from 'react';

export type InputProps = InputBaseProps & {
  /**
   * An optional element displayed at the start of the input field.
   * Typically used for icons or labels.
   */
  startAdornment?: ReactNode;
  /**
   * An optional element displayed at the end of the input field.
   * Often used for buttons, icons, or additional actions.
   */
  endAdornment?: ReactNode;
  /**
   * Specifies the size of the input field.
   * Can be 'small', 'medium', or 'large'.
   */
  size?: ItemSize;
};

import { InputProps as InputBaseProps } from '@mui/base';
import { ItemSize } from '@ui/shared/types/item-size';
import { ReactNode } from 'react';

export type InputProps = InputBaseProps & {
  /**
   * Specifies the size of the input field.
   * Can be 'small', 'medium', or 'large'.
   */
  size?: ItemSize;

  /**
   * Element displayed at the end of the input field.
   */
  endAdornment?: ReactNode;

  /**
   * Element displayed at the start of the input field.
   */
  startAdornment?: ReactNode;
};

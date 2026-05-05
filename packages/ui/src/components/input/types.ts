import type { InputHTMLAttributes, ReactNode } from 'react';
import type { ItemSize } from '@ui/shared/types/item-size';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
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

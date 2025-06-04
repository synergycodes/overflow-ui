import { ReactNode } from 'react';
import { Size, SIZES } from '../../shared/types/size';
import { rangeBetween } from '@ui/shared/utils/arrays';

export const CHIP_SIZES = rangeBetween(SIZES, 'small', 'extra-large');

export type ChipSize = Extract<
  Size,
  'small' | 'medium' | 'large' | 'extra-large'
>;

export type ChipProps = {
  /**
   * Size of the chip. Controls padding and font size.
   * small, medium, large, extra large.
   */
  size?: ChipSize;

  /**
   * Color theme of the chip. Used to define background and text colors.
   */
  color?:
    | 'neutral'
    | 'accent-1'
    | 'accent-2'
    | 'accent-3'
    | 'accent-4'
    | 'accent-5';

  /**
   * Optional icon displayed before the label.
   */
  icon?: ReactNode;

  /**
   * Optional icon used as a delete button.
   * Shown only when onDelete is provided.
   */
  deleteIcon?: ReactNode;

  /**
   * Callback function triggered when the delete icon is clicked.
   */
  onDelete?: () => void;

  /**
   * The content (usually text) displayed inside the chip.
   */
  label: ReactNode;
};

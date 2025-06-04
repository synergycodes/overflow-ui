import { ReactNode } from 'react';

/**
 * Props for the Chip component.
 */
export type ChipProps = {
  /**
   * Size of the chip. Controls padding and font size.
   * 's' - small, 'm' - medium, 'l' - large, 'xl' - extra large.
   */
  size?: 's' | 'm' | 'l' | 'xl';

  /**
   * Color theme of the chip. Used to define background and text colors.
   * 'natural' is neutral; 'accent-*' values represent different theme variations.
   */
  color?:
    | 'natural'
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

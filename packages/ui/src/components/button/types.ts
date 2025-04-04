/**
 * Button module bla bla
 * @module
 */
import { TooltipVariant } from '../tooltip/types';

export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'gray',
  'error',
  'warning',
  'success',
  'ghost-destructive',
] as const;

export type Variant = (typeof BUTTON_VARIANTS)[number];

/**
 * Button's shape
 */
export type Shape = '' | 'circle';

export type BaseButtonProps<T> = T &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
  CommonButtonProps;

export type CommonButtonProps = {
  tooltip?: string;
  tooltipType?: TooltipVariant;
};

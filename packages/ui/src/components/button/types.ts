/**
 * Button module bla bla
 * @module
 */
import { Size, SIZES } from '../../shared/types/size';
import { TooltipVariant } from '../tooltip/types';
import { rangeBetween } from '../../shared/utils/arrays';

export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'gray',
  'error',
  'warning',
  'success',
  'ghost-destructive',
] as const;

export const BUTTON_SIZES = rangeBetween(SIZES, 'extra-small', 'extra-large');

export type ButtonSize = Extract<
  Size,
  'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
>;

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
  size?: ButtonSize;
  tooltip?: string;
  tooltipType?: TooltipVariant;
};

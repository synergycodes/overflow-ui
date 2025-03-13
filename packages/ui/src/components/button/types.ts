import { TooltipVariant } from '../tooltip/types';

export type Variant =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'error'
  | 'warning'
  | 'success'
  | 'ghost-destructive';

export type Size = 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small';

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

import { ReactElement, ReactNode } from 'react';
import { Size, SIZES } from '../../shared/types/size';
import { rangeBetween } from '../../shared/utils/arrays';
import { BaseButtonProps, Shape } from '../button/types';
import { NavButtonProps } from '../button/nav-button/nav-button';

export const SEGMENT_PICKER_SIZES = rangeBetween(
  SIZES,
  'xxx-small',
  'extra-large',
);
export type SegmentPickerSize = Extract<
  Size,
  | 'xxs-small'
  | 'xs-small'
  | 'extra-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'extra-large'
>;

export type SegmentPickerProps = {
  /**
   * Defines the size of the segment picker.
   */
  size?: SegmentPickerSize;
  /**
   * Visual style of the segment picker.
   */
  variant?: 'rounded' | 'square';
  /**
   * The currently selected value.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  /**
   * Callback triggered when the user selects a different segment.
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: React.MouseEvent, value: any) => void;
  /**
   * Segment options to be rendered inside the picker.
   */
  children:
    | ReactElement<SegmentPickerOptionProps>
    | ReactElement<SegmentPickerOptionProps>[];
};

export type SegmentPickerOptionProps = BaseButtonProps<NavButtonProps> & {
  value: SegmentPickerProps['value'];
  label?: ReactNode;
  beforeIcon?: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  size?: SegmentPickerSize;
  shape?: Shape;
};

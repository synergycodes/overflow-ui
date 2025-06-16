import { BaseButtonProps } from '../types';
import { Size } from '@ui/shared/types/size';

export type NavBaseButtonProps = BaseButtonProps & {
  size?: Size;
  isSelected?: boolean;
};

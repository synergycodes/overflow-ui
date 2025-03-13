import { InputProps as InputBaseProps } from '@mui/base';
import { Size } from '@/axiom/shared/types/label-size';

export type InputProps = InputBaseProps & {
  searchIcon?: boolean;
  onClear?: () => void;
  size?: Size;
};

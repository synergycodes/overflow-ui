import clsx from 'clsx';
import inputStyles from './input.module.css';
import inputRootStyles from './input-root.module.css';
import inputFontStyles from '@ui/shared/styles/input-font-size.module.css';
import inputSizeStyles from '@ui/shared/styles/input-size.module.css';
import './variables.css';

import { Input as InputBase } from '@mui/base';
import type { InputProps } from './types';

export function Input({
  size = 'medium',
  startAdornment = undefined,
  endAdornment = undefined,
  ...props
}: InputProps) {
  return (
    <InputBase
      {...props}
      slotProps={{
        root: {
          className: clsx(inputRootStyles['input-root'], inputSizeStyles[size]),
        },
        input: { className: clsx(inputStyles['input'], inputFontStyles[size]) },
      }}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
    />
  );
}

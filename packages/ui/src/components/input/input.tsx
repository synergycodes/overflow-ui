import clsx from 'clsx';
import inputStyles from './input.module.css';
import inputRootStyles from './input-root.module.css';
import inputFontStyles from '@ui/shared/styles/input-font-size.module.css';
import inputSizeStyles from '@ui/shared/styles/input-size.module.css';
import './variables.css';

import { Input as InputBase } from '@mui/base';
import { InputProps } from './types';

export function Input({ size = 'medium', ...props }: InputProps) {
  return (
    <InputBase
      slotProps={{
        root: {
          className: clsx(inputRootStyles['input-root'], inputSizeStyles[size]),
        },
        input: { className: clsx(inputStyles['input'], inputFontStyles[size]) },
      }}
      {...props}
    ></InputBase>
  );
}

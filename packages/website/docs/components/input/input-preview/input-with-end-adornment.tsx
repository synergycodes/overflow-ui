import { useState } from 'react';
import { Input, InputProps } from '@synergycodes/axiom';
import { X } from '@phosphor-icons/react';
import classes from './input-preview.module.css';

export function InputWithEndAdornment({ ...props }: InputProps) {
  const [value, setValue] = useState<string>('Hello World');

  return (
    <Input
      {...props}
      size="large"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={classes.input}
      endAdornment={
        value && <X onClick={() => setValue('')} className={classes.clearBtn} />
      }
    />
  );
}

import { useState } from 'react';
import { Input, InputProps } from '@axiom/ui';
import { UserCircle } from '@phosphor-icons/react';
import classes from './preview.module.css';

export function InputWithStartAdornment({ ...props }: InputProps) {
  const [value, setValue] = useState<string>('Hello World');

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={classes.input}
      startAdornment={<UserCircle />}
    />
  );
}

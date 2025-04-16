import { useState } from 'react';
import { Input, InputProps } from '@axiom/ui';
import classes from './preview.module.css';

export function SimpleInput({ ...props }: InputProps) {
  const [value, setValue] = useState<string>('Hello World');

  return (
    <Input
      {...props}
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={classes.input}
    />
  );
}

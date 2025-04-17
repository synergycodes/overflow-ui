import { useState } from 'react';
import { Input } from '@synergycodes/axiom';
import classes from './input-preview.module.css';

export function SimpleInput() {
  const [value, setValue] = useState<string>('Hello World');

  return (
    <Input
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={classes.input}
    />
  );
}

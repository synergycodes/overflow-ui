import { useState } from 'react';
import { Input } from '@synergycodes/axiom';
import { UserCircle } from '@phosphor-icons/react';
import classes from './input-preview.module.css';

export function InputWithStartAdornment() {
  const [value, setValue] = useState<string>('Hello World');

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={classes.input}
      startAdornment={<UserCircle />}
    />
  );
}

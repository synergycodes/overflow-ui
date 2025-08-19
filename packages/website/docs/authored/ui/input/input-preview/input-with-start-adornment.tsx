import { useState } from 'react';
import { Input } from '@synergycodes/overflow-ui';
import { UserCircle } from '@phosphor-icons/react';

export function InputWithStartAdornment() {
  const [value, setValue] = useState<string>('Hello World');

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      startAdornment={<UserCircle />}
    />
  );
}

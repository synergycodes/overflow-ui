import { useState } from 'react';
import { Input } from '@synergycodes/overflow-ui';

export function SimpleInput() {
  const [value, setValue] = useState<string>('Hello World');

  return (
    <Input
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{
        minWidth: '200px',
      }}
    />
  );
}

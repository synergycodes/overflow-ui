import { useState } from 'react';
import { Input } from '@synergycodes/overflow-ui';
import { X } from '@phosphor-icons/react';

export function InputWithEndAdornment() {
  const [value, setValue] = useState<string>('Hello World');

  return (
    <Input
      size="large"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{
        minWidth: '200px',
      }}
      endAdornment={
        value && (
          <X
            onClick={() => setValue('')}
            style={{
              cursor: 'pointer',
              fontSize: '15px',
              height: '1em',
              width: '1em',
            }}
          />
        )
      }
    />
  );
}

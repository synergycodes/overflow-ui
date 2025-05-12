import { useState } from 'react';
import { Input } from '@synergycodes/axiom';
import { CharacterCounter } from '@synergycodes/axiom';

export function CharacterCounterPreview() {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <>
      <h5>Default Character Counter</h5>
      <Input
        size="small"
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
        style={{
          minWidth: '200px',
        }}
      />
      <CharacterCounter value={value1.length} max={250} />
      <h5>Required Character Counter</h5>
      <Input
        size="small"
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
        style={{
          minWidth: '200px',
        }}
      />
      <CharacterCounter value={value2.length} max={250} isRequired />
    </>
  );
}

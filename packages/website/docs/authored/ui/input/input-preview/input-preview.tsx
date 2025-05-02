import { InputWithStartAdornment } from './input-with-start-adornment';
import { InputWithEndAdornment } from './input-with-end-adornment';
import { SimpleInput } from './simple-input';

export function InputPreview() {
  return (
    <div
      style={{
        display: 'grid',
        gap: '10px',
      }}
    >
      <SimpleInput />
      <InputWithStartAdornment />
      <InputWithEndAdornment />
    </div>
  );
}

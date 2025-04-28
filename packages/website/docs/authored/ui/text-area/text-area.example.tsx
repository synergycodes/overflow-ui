import { TextArea } from '@synergycodes/axiom';

export function Example() {
  return (
    <TextArea
      size="medium"
      minRows={1}
      maxRows={5}
      placeholder="Placeholder text"
      defaultValue=""
      onChange={() => {}}
      disabled={false}
    />
  );
}

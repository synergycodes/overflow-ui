import { Checkbox } from "@synergycodes/axiom";

export function Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Checkbox size="small" />
      <Checkbox size="medium" />
      <Checkbox size="extra-small" />
      <Checkbox indeterminate />
      <Checkbox disabled />
      <Checkbox disabled checked />
      <Checkbox disabled indeterminate />
    </div>
  );
}

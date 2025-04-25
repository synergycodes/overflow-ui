import { LabelButton, Menu } from '@synergycodes/axiom';

export function Example() {
  return (
    <Menu
      items={[
        { label: 'Star Wars' },
        { label: 'Star Trek' },
        { label: 'Orville' },
      ]}
    >
      <LabelButton label="Open" />
    </Menu>
  );
}

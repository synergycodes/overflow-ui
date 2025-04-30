import { Tooltip } from '@synergycodes/axiom';

export function Example() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', maxWidth: '200px' }}
    >
      <Tooltip>
        <Tooltip.Trigger>
          <span>Tooltip</span>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <span>Tooltip</span>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

import { ArrowClockwise } from '@phosphor-icons/react';
import { NavButton, Tooltip } from '@synergycodes/axiom';

type Props = {
  onReset: () => void;
};

export function ResetButton({ onReset }: Props) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <NavButton onClick={onReset} icon={<ArrowClockwise />} />
      </Tooltip.Trigger>
      <Tooltip.Content>Reset</Tooltip.Content>
    </Tooltip>
  );
}

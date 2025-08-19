import { ArrowClockwise } from '@phosphor-icons/react';
import { NavButton, Tooltip } from '@synergycodes/overflow-ui';

type Props = {
  onReset: () => void;
} & Partial<React.ComponentProps<typeof NavButton>>;

export function ResetButton({ onReset, ...props }: Props) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <NavButton {...props} className="nav-button" onClick={onReset}>
          <ArrowClockwise />
        </NavButton>
      </Tooltip.Trigger>
      <Tooltip.Content>Reset</Tooltip.Content>
    </Tooltip>
  );
}

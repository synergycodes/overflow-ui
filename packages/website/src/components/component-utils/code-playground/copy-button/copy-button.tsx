import { Check, Copy } from '@phosphor-icons/react';
import { NavButton, Tooltip } from '@synergycodes/overflow-ui';
import { useState } from 'react';

type Props = {
  content?: string;
};

export function CopyButton({ content }: Props) {
  const [copied, setCopied] = useState(false);

  function onCopy() {
    if (!content) {
      console.error('No content to copy');
      return;
    }

    navigator.clipboard.writeText(content);
    setCopied(true);
  }

  function onMouseLeave() {
    setCopied(false);
  }

  const tooltipLabel = copied ? 'Copied!' : 'Copy contents';

  const icon = copied ? <Check /> : <Copy />;

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <NavButton
          className="nav-button"
          onMouseLeave={onMouseLeave}
          onClick={onCopy}
        >
          {icon}
        </NavButton>
      </Tooltip.Trigger>
      <Tooltip.Content>{tooltipLabel}</Tooltip.Content>
    </Tooltip>
  );
}

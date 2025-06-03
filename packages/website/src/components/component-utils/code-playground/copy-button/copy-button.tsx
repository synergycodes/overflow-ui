import { Copy } from '@phosphor-icons/react';
import { NavButton, Tooltip } from '@synergycodes/axiom';
import { useState } from 'react';

import styles from './copy-button.module.css';

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

  const tooltipLabel = copied ? 'Copied!' : 'Copy';

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <NavButton
          onMouseLeave={onMouseLeave}
          onClick={onCopy}
          className={styles['copy-button']}
          icon={<Copy />}
        />
      </Tooltip.Trigger>
      <Tooltip.Content>{tooltipLabel}</Tooltip.Content>
    </Tooltip>
  );
}

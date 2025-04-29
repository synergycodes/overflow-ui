import { SelectionProvider } from 'codehike/utils/selection';
import { parseProps } from 'codehike/blocks';
import styles from './code-spotlight.module.css';

import { Block, HighlightedCodeBlock } from 'codehike/blocks';
import { z } from 'zod';
import { CodeScrollContent } from './code-spotlight-content';
import { ComponentProps } from 'react';

export const CodeSpotlightSchema = Block.extend({
  steps: z.array(
    Block.extend({
      code: HighlightedCodeBlock,
    }),
  ),
});

type Props = {
  children: unknown;
} & ComponentProps<typeof CodeScrollContent>;

export function CodeSpotlight(props: Props) {
  const { steps } = parseProps(props, CodeSpotlightSchema);

  return (
    <SelectionProvider className={styles['container']}>
      <CodeScrollContent {...props} steps={steps} />
    </SelectionProvider>
  );
}

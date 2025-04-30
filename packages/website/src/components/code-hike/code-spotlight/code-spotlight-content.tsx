import styles from './code-spotlight.module.css';

import {
  Selection,
  Selectable,
  useSelectedIndex,
} from 'codehike/utils/selection';

import { tokenTransitions } from '../annotations/token-transitions';
import { wordWrap } from '../annotations/word-wrap';
import { type CodeSpotlightSchema } from './code-spotlight';
import { z } from 'zod';
import { HighlightedCode, Pre } from 'codehike/code';
import CodeBlock from '@theme/CodeBlock';

type Props = z.infer<typeof CodeSpotlightSchema> & {
  previewComponentName?: string;
  injectedCode?: {
    before?: string;
    after?: string;
  };
};

export function CodeSpotlightContent({
  previewComponentName,
  injectedCode: { before = '', after = '' } = {},
  steps,
}: Props) {
  const [index] = useSelectedIndex();
  const { code } = steps[index].code;

  const renderCode = previewComponentName
    ? `render(${previewComponentName})`
    : '';

  // For more information about "export"
  // check packages/website/src/components/component-utils/code-playground/code-playground.tsx
  const afterWithoutExport = after.split('export').at(-1);
  const allCode = [before, code, afterWithoutExport, renderCode].join('\n');

  return (
    <div className={styles['content']}>
      <CodeBlock metastring="noInline" live language="tsx">
        {allCode}
      </CodeBlock>
      <div className={styles['steps-container']}>
        <div className={styles['step-list']}>
          {steps.map((step, i) => (
            <Selectable
              key={i}
              index={i}
              selectOn={['click']}
              className={styles['step']}
            >
              <h2 className={styles['step-title']}>{step.title}</h2>
              <div className={styles['step-description']}>{step.children}</div>
            </Selectable>
          ))}
        </div>
        <Selection
          from={steps.map((step) => (
            <CodeStep codeblock={step.code} />
          ))}
        />
      </div>
    </div>
  );
}

function CodeStep({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <Pre
      code={codeblock}
      handlers={[tokenTransitions, wordWrap]}
      className={styles['code']}
    />
  );
}

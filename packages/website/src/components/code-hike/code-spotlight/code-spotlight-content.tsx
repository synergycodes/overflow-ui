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
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { Preview } from '../../component-utils/preview/preview';
import ReactLiveScope from '@site/src/theme/ReactLiveScope';

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

  const allCode = [before, code, after, renderCode].join('\n');

  return (
    <div className={styles['content']}>
      <LiveProvider noInline code={allCode} scope={ReactLiveScope}>
        <Preview className={styles['preview']}>
          <LivePreview />
          <LiveError />
        </Preview>
      </LiveProvider>
      <div className={styles['steps-container']}>
        <div className={styles['step-list']}>
          {steps.map((step, i) => (
            <Selectable
              key={i}
              index={i}
              selectOn={['click']}
              className={styles['step']}
            >
              <div className={styles['step-content']}>
                <div className={styles['active-mark']} />
                <h2 className={styles['step-title']}>{step.title}</h2>
                <div className={styles['step-description']}>
                  {step.children}
                </div>
              </div>
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

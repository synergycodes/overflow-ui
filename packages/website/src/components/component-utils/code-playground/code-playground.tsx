import cssVariablesData from '@site/generated/css-variables.json';
import { useState } from 'react';
import ShadowDomWrapper from '../shadow-dom-wrapper/shadow-dom-wrapper';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { Preview } from '../preview/preview';
import ReactLiveScope from '@site/src/theme/ReactLiveScope';
import { CodeEditor } from './code-editor';
import { OverflowUICSSRelativePath } from '@site/generated/path-types';

import ReactIcon from '@site/static/img/react.svg';
import CSSIcon from '@site/static/img/css.svg';

import styles from './code-playground.module.css';
import { FileTab } from './file-tab';
import clsx from 'clsx';
import { CopyButton } from './copy-button/copy-button';
import { ResetButton } from './reset-button/reset-button';

type Props = {
  exampleCode: string;
  cssPaths: OverflowUICSSRelativePath[];
};

export type PlaygroundFileType = 'react' | 'css';

const [hostSelectorStart, hostSelectorEnd] = [':host {', '}'];
export function Playground({ exampleCode, cssPaths }: Props) {
  const initialReactCode = exampleCode.trim();
  const [reactCode, setReactCode] = useState(initialReactCode);
  const initialCssCode = getCSSCode(cssPaths)?.trim();
  const [cssCode, setCssCode] = useState(initialCssCode);
  const [currentFile, setCurrentFile] = useState<PlaygroundFileType>('react');

  const isReact = currentFile === 'react';
  const isCSS = currentFile === 'css';

  const parsedCssCode = cssCode
    ? `${hostSelectorStart}${cssCode}${hostSelectorEnd}`
    : '';

  const codeToCopy = isReact ? reactCode : cssCode;

  function onReset() {
    setReactCode(initialReactCode);
    setCssCode(initialCssCode);
  }

  const canReset = isReact
    ? reactCode !== initialReactCode
    : cssCode !== initialCssCode;

  return (
    <LiveProvider code={reactCode} scope={ReactLiveScope}>
      <Preview>
        <ShadowDomWrapper>
          {cssCode && <style>{parsedCssCode}</style>}
          <LivePreview />
        </ShadowDomWrapper>
        <LiveError />
      </Preview>
      <div className={styles['editor-container']}>
        <div className={styles['editor-header']}>
          <div className={styles['file-tabs']}>
            <FileTab
              className={clsx(styles['file-react'], {
                [styles['active']]: isReact,
              })}
              onClick={() => setCurrentFile('react')}
              label="index.tsx"
              icon={<ReactIcon />}
            />
            <FileTab
              className={clsx(styles['file-css'], {
                [styles['active']]: isCSS,
              })}
              onClick={() => setCurrentFile('css')}
              label="styles.css"
              icon={<CSSIcon />}
            />
          </div>
          <div className={styles['toolbar']}>
            <CopyButton content={codeToCopy} />
            <ResetButton disabled={!canReset} onReset={onReset} />
          </div>
        </div>
        {isReact && (
          <LiveProvider code={reactCode} scope={ReactLiveScope}>
            <CodeEditor onChange={setReactCode} />
          </LiveProvider>
        )}
        {isCSS && (
          <LiveProvider code={cssCode} scope={ReactLiveScope}>
            <CodeEditor language="css" onChange={setCssCode} />
          </LiveProvider>
        )}
      </div>
    </LiveProvider>
  );
}

function getCSSCode(cssPaths: OverflowUICSSRelativePath[]) {
  const variableNames = cssPaths
    .flatMap((path) => cssVariablesData[path])
    .map(({ name }) => name);

  if (!variableNames.length) {
    return;
  }

  const infoComment =
    '/* Modify CSS variables of this component to see the changes */\n';

  const variableDeclarationsCode = variableNames
    .map((name) => `${name}: unset;`)
    .join('\n');

  return [infoComment, variableDeclarationsCode].join('\n');
}

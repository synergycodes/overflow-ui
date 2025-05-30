import cssVariablesData from '@site/generated/css-variables.json';
import { useState } from 'react';
import ShadowDomWrapper from '../shadow-dom-wrapper/shadow-dom-wrapper';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { Preview } from '../preview/preview';
import ReactLiveScope from '@site/src/theme/ReactLiveScope';
import { CodeEditor } from './code-editor';
import { AxiomCSSRelativePath } from '@site/generated/path-types';

import ReactIcon from '@site/static/img/react.svg';
import CSSIcon from '@site/static/img/css.svg';

import styles from './code-playground.module.css';
import { FileTab } from './file-tab';
import clsx from 'clsx';
import { NavButton } from '@synergycodes/axiom';
import { ClipboardText } from '@phosphor-icons/react';

type Props = {
  exampleCode: string;
  cssPaths: AxiomCSSRelativePath[];
};

export type PlaygroundFileType = 'react' | 'css';

const [hostSelectorStart, hostSelectorEnd] = [':host {', '}'];
export function Playground({ exampleCode, cssPaths }: Props) {
  const [reactCode, setReactCode] = useState(exampleCode.trim());
  const initialCssCode = getCSSCode(cssPaths);
  const [cssCode, setCssCode] = useState(initialCssCode?.trim());
  const [currentFile, setCurrentFile] = useState<PlaygroundFileType>('react');

  const isReact = currentFile === 'react';
  const isCSS = currentFile === 'css';

  const parsedCssCode = cssCode
    ? `${hostSelectorStart}${cssCode}${hostSelectorEnd}`
    : '';

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
          <FileTab
            className={clsx(styles['file-react'], {
              [styles['active']]: isReact,
            })}
            onClick={() => setCurrentFile('react')}
            label="index.tsx"
            icon={<ReactIcon />}
          />
          <FileTab
            className={clsx(styles['file-css'], { [styles['active']]: isCSS })}
            onClick={() => setCurrentFile('css')}
            label="styles.css"
            icon={<CSSIcon />}
          />

          <NavButton
            size="small"
            className={styles['copy-button']}
            icon={<ClipboardText />}
          />
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

function getCSSCode(cssPaths: AxiomCSSRelativePath[]) {
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

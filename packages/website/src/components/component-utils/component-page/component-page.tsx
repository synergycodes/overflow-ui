import { Description } from '../description/description';
import { PropMap, PropsList } from '../props-list/props-list';
import {
  OverflowUICSSRelativePath,
  OverflowUITSXRelativePath,
} from '@site/generated/path-types';
import { CSSVariablesList } from '../css-variable-list/css-variable-list';
import { Playground } from '../code-playground/code-playground';

import styles from './component-page.module.css';

export type ComponentPageProps = {
  componentPath?: OverflowUITSXRelativePath;
  cssPaths?: OverflowUICSSRelativePath[];
  exampleCode: string;
  className?: string;
  hardcodedData?: HardcodedData;
};

export function ComponentPage(props: ComponentPageProps) {
  const { exampleCode, cssPaths = [], componentPath, hardcodedData } = props;
  const { description } = hardcodedData ?? {};

  return (
    <div className={styles['main-container']}>
      <Section>
        <Description path={componentPath} hardcodedDescription={description} />
        <Playground cssPaths={cssPaths} exampleCode={exampleCode} />
      </Section>
      <Section>
        <PropsList path={componentPath} hardcodedProps={hardcodedData?.props} />
      </Section>
      <Section>
        <CSSVariablesList paths={cssPaths} />
      </Section>
    </div>
  );
}

type HardcodedData = {
  props?: PropMap;
  description?: string;
};

function Section({ children }: { children: React.ReactNode }) {
  return <div className={styles['section']}>{children}</div>;
}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Description } from '../description/description';
import { PropsList } from '../props-list/props-list';
import { Playground } from '../code-playground/code-playground';
import { Preview } from '../preview/preview';
import { CSSVariablesList } from '../css-variables-list/css-variables-list';
import {
  AxiomCSSRelativePath,
  AxiomTSXRelativePath,
} from '@site/generated/path-types';
import styles from './component-page.module.css';

type Props = {
  componentPath: AxiomTSXRelativePath;
  cssPath: AxiomCSSRelativePath;
  exampleCode: string;
  preview: React.ReactNode;
};

export function ComponentPage({
  componentPath,
  cssPath,
  exampleCode,
  preview,
}: Props) {
  return (
    <>
      <Description path={componentPath} />
      <Tabs>
        <TabItem value="api" label="API">
          <div className={styles['api-tab']}>
            <Preview>{preview}</Preview>
            <div className={styles['component-container']}>
              <PropsList path={componentPath} />
              <CSSVariablesList path={cssPath} />
            </div>
          </div>
        </TabItem>
        <TabItem value="playground" label="Playground">
          <Playground exampleCode={exampleCode} />
        </TabItem>
      </Tabs>
    </>
  );
}

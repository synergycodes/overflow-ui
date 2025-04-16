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
  cssPaths?: AxiomCSSRelativePath[];
  exampleCode: string;
  preview: React.ReactNode;
};

export function ComponentPage({
  componentPath,
  cssPaths = [],
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
              {cssPaths.length > 0 && (
                <div>
                    <h1>CSS Variables</h1>
                    {cssPaths.map((path) => (
                      <CSSVariablesList key={path} path={path} />
                    ))}
                </div>
              )}
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

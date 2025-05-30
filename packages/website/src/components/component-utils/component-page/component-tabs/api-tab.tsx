import { PropsList } from '../../props-list/props-list';
import { CSSVariablesList } from '../../css-variables-list/css-variables-list';
import { Preview } from '../../preview/preview';
import { TabData, TabProps } from './component-tabs';

export const apiTab: TabData = {
  component: ApiTab,
  label: 'API',
  value: 'api',
};

export function ApiTab({
  preview,
  cssPaths,
  componentPath,
  hardcodedData,
}: TabProps) {
  const paths = cssPaths as typeof cssPaths;
  if (!paths) {
    return;
  }

  const { props = {} } = hardcodedData;

  return (
    <>
      <Preview>{preview}</Preview>
      <PropsList path={componentPath} hardcodedProps={props} />
      {cssPaths.length > 0 && (
        <div>
          <h1>CSS Variables</h1>
          {cssPaths.map((path) => (
            <CSSVariablesList key={path} path={path} />
          ))}
        </div>
      )}
    </>
  );
}

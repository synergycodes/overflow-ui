import { TabData, TabProps } from './component-tabs';
import { Playground } from '../../code-playground/code-playground';

export const playgroundTab: TabData = {
  value: 'playground',
  label: 'Playground',
  component: PlaygroundTab,
};

function PlaygroundTab({ exampleCode, cssPaths }: TabProps) {
  return <Playground exampleCode={exampleCode} cssPaths={cssPaths} />;
}

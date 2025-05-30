import { Description } from '../description/description';
import { PropMap } from '../props-list/props-list';
import {
  AxiomCSSRelativePath,
  AxiomTSXRelativePath,
} from '@site/generated/path-types';
import { ComponentTabs } from './component-tabs/component-tabs';

export type ComponentPageProps = {
  componentPath?: AxiomTSXRelativePath;
  cssPaths?: AxiomCSSRelativePath[];
  exampleCode: string;
  preview: React.ReactNode;
  className?: string;
  hardcodedData?: HardcodedData;
};

export function ComponentPage(props: ComponentPageProps) {
  const { componentPath, hardcodedData } = props;
  const { description } = hardcodedData ?? {};

  return (
    <>
      <Description path={componentPath} hardcodedDescription={description} />
      <ComponentTabs {...props} hardcodedData={hardcodedData ?? {}} />
    </>
  );
}

type HardcodedData = {
  props?: PropMap;
  description?: string;
};

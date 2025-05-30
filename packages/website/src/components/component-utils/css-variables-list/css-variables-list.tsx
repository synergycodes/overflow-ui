import cssVariablesData from '@site/generated/css-variables.json';
import { CSSVariableData } from '@site/src/types';
import { CSSVariableItem } from './css-variable-item';
import { AxiomCSSRelativePath } from '@site/generated/path-types';

type Props = {
  path: AxiomCSSRelativePath;
};

export function CSSVariablesList({ path }: Props) {
  const entries = Object.values(cssVariablesData[path] as CSSVariableData[]);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div>
      {entries.map((variableData) => (
        <CSSVariableItem key={variableData.name} {...variableData} />
      ))}
    </div>
  );
}

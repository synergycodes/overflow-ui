import cssVariablesData from '@site/generated/css-variables.json';
import { CSSVariableData } from '@site/src/types';
import { CSSVariableItem } from './css-variable-item';
import { AxiomCSSRelativePath } from '@site/generated/path-types';
import { CSSVariableType, variableTypes } from './css-variable-types';
import { entries, groupBy } from 'remeda';

import styles from './css-variable-list.module.css';

type Props = {
  path: AxiomCSSRelativePath;
};

export function CSSVariablesList({ path }: Props) {
  const variableEntries = Object.values(
    cssVariablesData[path] as CSSVariableData[],
  );

  if (variableEntries.length === 0) {
    return null;
  }

  const variableTypeMap = toVariableTypeMap(variableEntries);

  return (
    <div className={styles['variable-list']}>
      {entries(variableTypeMap).map(([type, variables]) => (
        <div className={styles['category']} key={type}>
          <h2 className={styles['label']}>{variableTypes[type].label}</h2>
          {variables.map((variableData) => (
            <CSSVariableItem key={variableData.name} {...variableData} />
          ))}
        </div>
      ))}
    </div>
  );
}

type VariableTypeMap = {
  [key in CSSVariableType]: CSSVariableData[];
};

const toVariableTypeMap = (variables: CSSVariableData[]) => {
  const groups = groupBy(variables, getVariableType);

  return groups as VariableTypeMap;
};

function getVariableType({ name }: CSSVariableData) {
  const [type] = entries(variableTypes).find(([, { keywords }]) =>
    keywords.some((keyword) => name.includes(keyword)),
  ) ?? ['miscellaneous'];

  return type as CSSVariableType;
}

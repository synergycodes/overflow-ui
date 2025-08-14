import { PropDescriptor } from 'react-docgen';
import { getAPIData } from '../get-api-data';
import { PropDescription } from './prop-description';
import styles from './props-list.module.css';
import { OverflowUITSXRelativePath } from '@site/generated/path-types';

type Props = {
  path?: OverflowUITSXRelativePath;
  hardcodedProps?: PropMap;
};

export function PropsList({ path, hardcodedProps = {} }: Props) {
  if (!path) {
    return null;
  }

  const { props } = getAPIData(path);
  const allProps = { ...props, ...hardcodedProps };
  const propsEntries = Object.entries(allProps);

  if (propsEntries.length === 0) {
    return null;
  }

  const sortedEntries = propsEntries.sort(sortByRequired);

  return (
    <>
      <h1>Props</h1>
      <div className={styles['container']}>
        {sortedEntries.map(([name, propDescriptor]) => (
          <PropDescription key={name} name={name} descriptor={propDescriptor} />
        ))}
      </div>
    </>
  );
}

export type PropMap = Record<string, PropDescriptor>;

function sortByRequired(
  [, propDescriptorA]: [string, PropDescriptor],
  [,]: [string, PropDescriptor],
) {
  return propDescriptorA.required ? -1 : 1;
}

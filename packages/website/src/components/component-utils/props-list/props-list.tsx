import { getAPIData } from '../get-api-data';
import { PropDescription } from './prop-description';
import styles from './props-list.module.css';

type Props = {
  path: string;
};

export function PropsList({ path }: Props) {
  const { props } = getAPIData(path);
  const propsEntries = Object.entries(props);

  return (
    <div>
      <h1>Props</h1>
      <div className={styles['container']}>
        {propsEntries.map(([name, propDescriptor]) => (
          <PropDescription key={name} name={name} descriptor={propDescriptor} />
        ))}
      </div>
    </div>
  );
}

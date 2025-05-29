import { PropDescriptor } from 'react-docgen';
import styles from './props-list.module.css';
import { PropItem } from './prop-item';
import { PropTag } from './prop-tag';
import { useComponentProperties } from './use-component-properties';

type Props = {
  name: string;
  descriptor: PropDescriptor;
};

export function PropDescription({ descriptor, name }: Props) {
  const { propEntries, propTags, description } =
    useComponentProperties(descriptor);

  return (
    <div key={name} className={styles['prop-row']}>
      <div className={styles['prop-item']}>
        <h2>{name}</h2>
        {propTags.map((tag: string) => (
          <PropTag key={tag}>{tag}</PropTag>
        ))}
      </div>
      {propEntries.map(([name, value]) => (
        <PropItem key={name} name={name} value={value} />
      ))}
      <div>{description}</div>
    </div>
  );
}

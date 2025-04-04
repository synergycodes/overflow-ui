import styles from './props-list.module.css';

export function PropItem({ name, value }: Props) {
  return (
    <div className={styles['prop-item']}>
      <span className={styles['header']}>{name}</span>
      <span className={styles['value']}>{value}</span>
    </div>
  );
}

type Props = {
  name: string;
  value: string;
};

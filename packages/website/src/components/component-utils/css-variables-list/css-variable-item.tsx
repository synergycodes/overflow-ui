import styles from './css-variables-list.module.css';

type Props = {
  name: string;
  comment?: string;
};

export function CSSVariableItem({ name, comment }: Props) {
  return (
    <div className={styles['variable-item']}>
      <span className={styles['name']}>{name}</span>
      <span className={styles['comment']}>{comment}</span>
    </div>
  );
}

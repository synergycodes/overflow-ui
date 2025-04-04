import styles from './props-list.module.css';

type Props = {
  children: React.ReactNode;
};

export function PropTag({ children }: Props) {
  return <div className={styles['prop-tag']}>{children}</div>;
}

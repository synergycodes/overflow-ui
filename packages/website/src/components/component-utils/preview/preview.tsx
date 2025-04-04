import styles from './preview.module.css';

type Props = {
  children: React.ReactNode;
};

export function Preview({ children }: Props) {
  return (
    <div className={styles['preview-container']}>
      <div>{children}</div>
    </div>
  );
}

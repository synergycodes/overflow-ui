import styles from './message.module.css';

type MessageProps = {
  title: string;
  subtitle: string | undefined;
};

export function Message({ title, subtitle }: MessageProps) {
  return (
    <div className={styles['container']}>
      <span className={styles['title']}>{title}</span>
      {subtitle && <span className={styles['subtitle']}>{subtitle}</span>}
    </div>
  );
}

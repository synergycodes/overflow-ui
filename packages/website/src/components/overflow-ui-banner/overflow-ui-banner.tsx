import styles from './overflow-ui-banner.module.css';

export function OverflowUIBanner() {
  return (
    <>
      <div className={styles['banner']}>
        <div className={styles['text-container']}>
          <p className={styles['title']}>React Flow UI Components</p>
          <p className={styles['description']}>
            Start building with open-source UI components for React Flow.
            Ready-to-use documentation, code examples, and API references help
            you reduce setup time and scale faster.
          </p>
          <div className={styles['background']} />
        </div>
        <div className={styles['logo']} />
      </div>
      <hr />
    </>
  );
}

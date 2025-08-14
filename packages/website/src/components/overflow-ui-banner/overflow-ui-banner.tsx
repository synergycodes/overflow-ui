import styles from './overflow-ui-banner.module.css';

export function OverflowUIBanner() {
  return (
    <>
      <div className={styles['banner']}>
        <div className={styles['text-container']}>
          <p className={styles['title']}>React Flow UI Components</p>
          <p className={styles['description']}>
            Build better and engage your customers across all channels with our
            API reference documentation, quickstarts, SDKs and multi- language
            code samples.
          </p>
          <div className={styles['background']} />
        </div>
        <div className={styles['logo']} />
      </div>
      <hr />
    </>
  );
}

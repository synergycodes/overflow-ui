import styles from './axiom-banner.module.css';

export function AxiomBanner() {
  return (
    <div className={styles['banner']}>
      <div className={styles['text-container']}>
        <p className={styles['title']}>React Flow UI Components </p>
        <p className={styles['description']}>
          Build better and engage your customers across all channels with our
          API reference documentation, quickstarts, SDKs and multi- language
          code samples.
        </p>
      </div>
      <div className={styles['logo']}>
        <img src={'/ui-components/img/logo-dark.svg'} alt="Axiom Logo" />
      </div>
    </div>
  );
}

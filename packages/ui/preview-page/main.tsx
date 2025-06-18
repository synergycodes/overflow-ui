import { createRoot } from 'react-dom/client';
import { PreviewPage } from './preview-page';
import styles from './preview-page.module.css';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
  <PreviewWrapper>
    <PreviewPage />
  </PreviewWrapper>,
);

function PreviewWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['preview-container']}>
      <div className={styles['preview-header']}>Components Testing</div>
      <div className={styles['preview-content']}>{children}</div>
    </div>
  );
}

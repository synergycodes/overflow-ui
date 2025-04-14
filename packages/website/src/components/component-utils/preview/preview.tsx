import { useMuteKnownPreviewErrors } from '@site/src/hooks/use-mute-known-preview-errors';

import styles from './preview.module.css';

type Props = {
  children: React.ReactNode;
};

export function Preview({ children }: Props) {
  useMuteKnownPreviewErrors([
    /* 
      TextareaAutosize from MUI has an issue with ResizeObserver when switching tabs in Docusaurus.
      It seems that both MUI and Docusaurus try to adjust the height on initialization,
      which causes an error (the component renders normally).
    */
    'ResizeObserver loop completed with undelivered notifications.',
  ]);

  return (
    <div className={styles['preview-container']}>
      <div>{children}</div>
    </div>
  );
}

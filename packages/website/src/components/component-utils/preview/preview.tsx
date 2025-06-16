import { useMuteKnownPreviewErrors } from '@site/src/hooks/use-mute-known-preview-errors';
import clsx from 'clsx';
import styles from './preview.module.css';
import ShadowDomWrapper from '../shadow-dom-wrapper/shadow-dom-wrapper';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Preview({ children, className }: Props) {
  useMuteKnownPreviewErrors([
    /*
      TextareaAutosize from MUI has an issue with ResizeObserver when switching tabs in Docusaurus.
      It seems that both MUI and Docusaurus try to adjust the height on initialization,
      which causes an error (the component renders normally).
    */
    'ResizeObserver loop completed with undelivered notifications.',
  ]);

  return (
    <div className={clsx(styles['preview-container'], className)}>
      <div className={styles['inner-container']}>
        <div className={styles['content']}>
          <div className={styles['background']}>
            <ShadowDomWrapper>
              <div>{children}</div>
            </ShadowDomWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

import clsx from 'clsx';
import styles from './modal.module.css';
import { Modal as BaseModal } from '@mui/base/Modal';
import { forwardRef, type ReactNode } from 'react';
import { NavButton } from '@ui/components/button/nav-button/nav-button';
import { Fade } from '@mui/material';
import type { WithIcon } from '@ui/shared/types/with-icon';
import { X } from '@phosphor-icons/react';
import type { FooterVariant } from './types';

type ModalProps = Partial<WithIcon> & {
  /**
   * Title displayed in the modal header
   */
  title: string;
  /**
   * Optional subtitle displayed below the title
   */
  subtitle?: string;
  /**
   * Content to be displayed in the modal body
   */
  children?: ReactNode;
  /**
   * Content to be displayed in the modal footer
   */
  footer?: ReactNode;
  /**
   * Size variant of the modal
   */
  size?: 'regular' | 'large';
  /**
   * Variant of the footer styling
   */
  footerVariant?: FooterVariant;
  /**
   * Controls the visibility of the modal
   */
  open: boolean;
  /**
   * Callback function called when the modal is closed
   */
  onClose?: () => void;
};

/**
 * A modal dialog component that appears on top of the main content,
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      icon,
      title,
      subtitle,
      children,
      footer,
      size = 'regular',
      footerVariant = 'integrated',
      open,
      onClose,
    },
    ref,
  ) => {
    return (
      <BaseModal
        className={styles['modal-base']}
        open={open}
        onClose={onClose}
        slots={{
          backdrop: Backdrop,
        }}
      >
        <Fade in={open}>
          <div className={clsx(styles['modal'], styles[size])} ref={ref}>
            <div className={styles['header']}>
              <div className={styles['title-wrapper']}>
                {icon && <div className={styles['icon']}>{icon}</div>}
                <div className={styles['title-container']}>
                  <span className={clsx(styles['title'], 'ax-public-h6')}>
                    {title}
                  </span>
                  {subtitle && (
                    <span
                      className={clsx(styles['description'], 'ax-public-p11')}
                    >
                      {subtitle}
                    </span>
                  )}
                </div>
              </div>
              {onClose && (
                <NavButton onClick={onClose}>
                  <X />
                </NavButton>
              )}
            </div>

            {children && <div className={styles['content']}>{children}</div>}

            {footer && (
              <div className={clsx(styles['footer'], styles[footerVariant])}>
                {footer}
              </div>
            )}
          </div>
        </Fade>
      </BaseModal>
    );
  },
);

/**
 * Backdrop component for the modal that dims the background
 */
const Backdrop = forwardRef<HTMLDivElement, BackdropProps>((props, ref) => {
  const { open, className } = props;

  return (
    <Fade in={open}>
      <div
        {...props}
        ref={ref}
        className={clsx(
          { 'base-Backdrop-open': open },
          styles['backdrop'],
          className,
        )}
      />
    </Fade>
  );
});

type BackdropProps = {
  open?: boolean;
  className: string;
  onClose?: () => void;
};

import clsx from 'clsx';
import styles from './snackbar.module.css';

import { forwardRef } from 'react';
import { Snackbar as BaseSnackbar } from '@mui/base';
import { ActionButtons } from './components/action-buttons';
import { Message } from './components/message';
import { SnackbarVariant } from './types';
import { Icon } from './components/icon';

export type SnackbarProps = {
  variant: SnackbarVariant;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  close?: boolean;
  onClose?: () => void;
};

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      variant,
      title,
      subtitle,
      buttonLabel,
      onButtonClick,
      close = false,
      onClose,
    },
    ref,
  ) => (
    <div ref={ref}>
      <BaseSnackbar
        open={true}
        className={clsx(styles['container'], styles[variant])}
      >
        <div className={styles['content']}>
          <Icon isCentered={!subtitle} variant={variant} />
          <Message title={title} subtitle={subtitle} />
          <ActionButtons
            variant={variant}
            buttonLabel={buttonLabel}
            onButtonClick={onButtonClick}
            close={close}
            onClose={onClose}
          />
        </div>
      </BaseSnackbar>
    </div>
  ),
);

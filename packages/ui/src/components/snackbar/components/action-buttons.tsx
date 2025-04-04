import { Variant } from '@ui/components/button/types';
import { SnackbarType } from '../types';

import styles from './action-buttons.module.css';
import { X } from '@phosphor-icons/react';
import { LabelButton } from '@ui/components/button/label-button/label-button';
import { NavButton } from '@ui/components/button/nav-button/nav-button';

type ActionButtonsProps = {
  variant: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  close: boolean;
  onClose?: () => void;
};

export function ActionButtons({
  variant,
  buttonLabel,
  onButtonClick,
  close,
  onClose,
}: ActionButtonsProps) {
  const buttonTypeMap: Record<string, Variant> = {
    [SnackbarType.DEFAULT]: 'primary',
    [SnackbarType.ERROR]: 'error',
    [SnackbarType.INFO]: 'primary',
    [SnackbarType.WARNING]: 'warning',
    [SnackbarType.SUCCESS]: 'success',
  };

  const buttonType = buttonTypeMap[variant] || 'primary';

  return (
    <div className={styles['container']}>
      {buttonLabel && onButtonClick && (
        <LabelButton
          variant={buttonType}
          label={buttonLabel}
          onClick={onButtonClick}
        />
      )}
      {close && onClose && (
        <NavButton
          icon={<X />}
          size="xxx-small"
          noBackground={true}
          onClick={onClose}
        />
      )}
    </div>
  );
}

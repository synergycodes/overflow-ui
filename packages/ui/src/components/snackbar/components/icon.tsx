import { Info } from '@phosphor-icons/react';
import { SnackbarVariant } from '../types';
import { clsx } from 'clsx';

import styles from './icon.module.css';
import { WithIcon } from '@ui/shared/types/with-icon';

type IconProps = WithIcon & {
  isCentered: boolean;
  variant: SnackbarVariant;
};

export function Icon({ icon, isCentered, variant }: IconProps) {
  return (
    <div
      className={clsx(styles['container'], {
        [styles['center']]: isCentered,
      })}
    >
      {icon ?? <Info className={clsx(styles['status'], styles[variant])} />}
    </div>
  );
}

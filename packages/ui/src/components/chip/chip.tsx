import { ChipProps } from './types';
import styles from './chip.module.css';
import clsx from 'clsx';
import { X } from '@phosphor-icons/react';

export function Chip({
  size = 'm',
  color = 'natural',
  label,
  icon,
  deleteIcon,
  onDelete,
}: ChipProps) {
  return (
    <div
      className={clsx(styles['chip'], styles[`size-${size}`], styles[color])}
      role={onDelete && 'button'}
    >
      {icon && <span className={styles['icon']}>{icon}</span>}
      <span>{label}</span>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className={styles['delete-icon']}
        >
          {deleteIcon ?? <X />}
        </button>
      )}
    </div>
  );
}

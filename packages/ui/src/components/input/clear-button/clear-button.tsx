import styles from './clear-button.module.css';
import { X } from '@phosphor-icons/react';

type Props = {
  onClick: () => void;
};

export function ClearButton({ onClick }: Props) {
  return (
    <div className={styles['clear-button']} onClick={onClick}>
      <X weight="bold" />
    </div>
  );
}

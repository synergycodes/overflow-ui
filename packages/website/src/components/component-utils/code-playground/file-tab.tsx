import { Button } from '@synergycodes/overflow-ui';
import styles from './code-playground.module.css';
import clsx from 'clsx';
import { ReactElement } from 'react';

type Props = {
  label: string;
  icon: ReactElement;
  onClick: () => void;
  className?: string;
};

export function FileTab({ label, icon, onClick, className }: Props) {
  return (
    <Button
      onClick={onClick}
      className={clsx(styles['file-tab'], className)}
      variant="secondary"
    >
      {icon}
      {label}
    </Button>
  );
}

import { IconLabelButton } from '@synergycodes/axiom';
import styles from './code-playground.module.css';
import clsx from 'clsx';

type Props = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export function FileTab({ label, icon, onClick, className }: Props) {
  return (
    <IconLabelButton
      onClick={onClick}
      className={clsx(styles['file-tab'], className)}
      variant="secondary"
    >
      {icon}
      {label}
    </IconLabelButton>
  );
}

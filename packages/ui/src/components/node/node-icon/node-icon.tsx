import clsx from 'clsx';
import styles from './node-icon.module.css';

import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  className?: string;
};

export function NodeIcon({ icon, className }: Props) {
  return <div className={clsx(styles['container'], className)}>{icon}</div>;
}

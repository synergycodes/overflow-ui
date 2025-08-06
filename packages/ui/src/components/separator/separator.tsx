import clsx from 'clsx';
import styles from './separator.module.css';

export type Props = {
  /**
   * Custom class name for the component.
   */
  className?: string;
};

/**
 * A visual separator component that creates a horizontal line to divide content.
 */
export function Separator({ className }: Props) {
  return <hr className={clsx(styles['separator'], className)} />;
}

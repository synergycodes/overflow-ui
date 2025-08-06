import clsx from 'clsx';
import styles from './node-description.module.css';

type Props = {
  // The main label or title text to be displayed
  label: string;

  // Optional description or subtitle text
  description?: string;

  // Optional custom class name for the outer container
  className?: string;

  // Optional custom class name for the label element
  classNameLabel?: string;

  // Optional custom class name for the subtitle/description element
  classNameSubtitle?: string;
};

export function NodeDescription({
  label,
  description,
  className,
  classNameLabel,
  classNameSubtitle,
}: Props) {
  return (
    <div className={clsx(styles['container'], className)}>
      <span className={clsx('ax-public-h9', styles['title'], classNameLabel)}>
        {label}
      </span>
      <span
        className={clsx('ax-public-p11', styles['subtitle'], classNameSubtitle)}
      >
        {description}
      </span>
    </div>
  );
}

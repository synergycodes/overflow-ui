import { SegmentPickerOptionProps } from './types';
import { NavButton } from '../button/nav-button/nav-button';
import clsx from 'clsx';
import styles from './segment-picker.module.css';

export function SegmentPickerOption({
  value,
  beforeIcon,
  label,
  icon,
  selected = false,
  onClick,
  size,
  shape = '',
  ...props
}: SegmentPickerOptionProps) {
  return (
    <NavButton
      {...props}
      value={value}
      className={clsx(styles['segment'], { [styles['active']]: selected })}
      beforeIcon={beforeIcon}
      label={label}
      icon={icon}
      onClick={onClick}
      size={size}
      shape={shape}
    />
  );
}

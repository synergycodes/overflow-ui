import { Children, cloneElement, isValidElement } from 'react';
import { SegmentPickerProps } from './types';
import styles from './segment-picker.module.css';
import clsx from 'clsx';

export function SegmentPicker({
  value,
  onChange,
  size = 'medium',
  variant = 'square',
  children,
}: SegmentPickerProps) {
  return (
    <div
      className={clsx(
        styles['segment-picker'],
        styles[`size-${size}`],
        styles[variant],
      )}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null;

        const childValue = child.props.value;

        return cloneElement(child, {
          selected: childValue === value,
          onClick: (e: React.MouseEvent) => {
            if (childValue !== value) {
              onChange(e, childValue);
            }
          },
          size,
          shape: variant === 'rounded' ? 'circle' : '',
        });
      })}
    </div>
  );
}

import clsx from 'clsx';
import styles from './segment-picker.module.css';

import { LabelButton } from '../button/label-button/label-button';

export type SegmentPickerProps = {
  /**
   * Optional CSS class name for custom styling
   */
  className?: string;
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Callback function called when a new item is selected
   */
  onChange: (value: string) => void;
  /**
   * Array of selectable item strings
   */
  items: string[];
};

/**
 * A segmented picker component that allows users to choose one value from a set of string options.
 * Typically used for toggling between views or filtering content.
 */
export function SegmentPicker({
  className,
  items,
  value,
  onChange,
}: SegmentPickerProps) {
  return (
    <div className={clsx(styles['container'], className)}>
      {items.map((item) => (
        <LabelButton
          key={item}
          size="extra-small"
          className={styles['button']}
          variant={value === item ? 'primary' : 'secondary'}
          onClick={() => onChange(item)}
          label={item}
        />
      ))}
    </div>
  );
}

import clsx from 'clsx';
import switchStyles from './switch.module.css';

import { Switch as SwitchBase, SwitchProps } from '@mui/base';
import { ChangeEvent } from 'react';
import { SelectorSize } from '@ui/shared/types/selector-size';

export type BaseSwitchProps = {
  /**
   * Size of the switch component
   */
  size?: SelectorSize;
  /**
   * Custom styles to apply to the switch
   */
  styles?: string;
  /**
   * Custom content for the thumb of the switch
   */
  thumbChildren?: React.ReactNode;
  /**
   * Custom content for the track of the switch
   */
  trackChildren?: React.ReactNode;
  /**
   * Custom class name for the switch component
   */
  className?: string;
  /**
   * Whether the switch is checked or not
   */
  checked?: boolean;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Callback function when the switch state changes
   */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<SwitchProps, 'onChange'>;

/**
 * A Switch component that allows users to toggle between two states, such as on and off.
 * Typically used for settings or preferences, it provides immediate visual feedback.
 */
export function Switch({
  size = 'medium',
  className,
  styles,
  thumbChildren,
  trackChildren,
  onChange,
  ...props
}: BaseSwitchProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.checked, event);
  }

  const slotProps = {
    root: {
      className: clsx(
        switchStyles['container'],
        switchStyles[size],
        styles,
        className,
      ),
    },
    thumb: {
      className: clsx({ [switchStyles['thumb']]: !thumbChildren }),
      children: thumbChildren,
    },
    track: {
      className: clsx({ [switchStyles['track']]: !trackChildren }),
      children: trackChildren,
    },
  };

  return (
    <SwitchBase slotProps={slotProps} onChange={handleChange} {...props} />
  );
}

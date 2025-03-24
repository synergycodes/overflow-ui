import clsx from 'clsx';
import switchStyles from './switch.module.css';

import { Switch as SwitchBase, SwitchProps } from '@mui/base';
import { ChangeEvent } from 'react';
import { SelectorSize } from '@ui/shared/types/selector-size';

export type BaseSwitchProps = {
  size?: SelectorSize;
  styles?: string;
  thumbChildren?: React.ReactNode;
  trackChildren?: React.ReactNode;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<SwitchProps, 'onChange'>;

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

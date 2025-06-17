import clsx from 'clsx';
import styles from './segment-picker.module.css';
import borderRadiusStyles from './border-radius-size.module.css';

import { createContext, useState, ReactElement } from 'react';
import { Size } from '@ui/shared/types/size';
import { Shape } from '@ui/components/button/types';
import { SegmentPickerItemProps, Item } from './item/segment-picker-item';

export const SegmentPickerContext =
  createContext<SegmentPickerContextType | null>(null);

type SegmentPickerContextType = {
  selectedValue: string | null;
  onSelect: (value: string) => void;
  size?: Size;
  shape?: Shape;
};

type SegmentPickerProps = {
  children: ReactElement<SegmentPickerItemProps, typeof Item>[];
  value?: string;
  onChange?: (value: string) => void;
  size?: Size;
  shape?: Shape;
};

function Root({
  children,
  value,
  onChange,
  size = 'medium',
  shape = '',
}: SegmentPickerProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    value || null,
  );

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <SegmentPickerContext.Provider
      value={{ selectedValue, onSelect: handleSelect, size, shape }}
    >
      <div
        className={clsx(
          styles['container'],
          styles[shape],
          borderRadiusStyles[size],
        )}
      >
        {children}
      </div>
    </SegmentPickerContext.Provider>
  );
}

export const SegmentPicker = {
  Root,
  Item,
};

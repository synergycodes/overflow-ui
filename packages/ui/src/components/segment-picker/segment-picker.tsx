import clsx from 'clsx';
import styles from './segment-picker.module.css';
import borderRadiusStyles from './border-radius-size.module.css';

import {
  createContext,
  useState,
  ReactElement,
  forwardRef,
  ForwardRefExoticComponent,
} from 'react';
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
  size?: Size;
  shape?: Shape;
  className?: string;
  onChange?: (value: string) => void;
};

type SegmentPickerComponent = ForwardRefExoticComponent<
  SegmentPickerProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: typeof Item;
};

export const SegmentPicker = forwardRef<HTMLDivElement, SegmentPickerProps>(
  (
    { children, value, size = 'medium', shape = '', className, onChange },
    ref,
  ) => {
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
          ref={ref}
          className={clsx(
            styles['container'],
            styles[shape],
            borderRadiusStyles[size],
            className,
          )}
        >
          {children}
        </div>
      </SegmentPickerContext.Provider>
    );
  },
) as SegmentPickerComponent;

SegmentPicker.Item = Item;

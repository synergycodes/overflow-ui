import clsx from 'clsx';
import styles from './segment-picker.module.css';
import borderRadiusStyles from './border-radius-size.module.css';

import {
  createContext,
  useState,
  ReactElement,
  forwardRef,
  ForwardRefExoticComponent,
  MouseEventHandler,
} from 'react';
import { Size } from '@ui/shared/types/size';
import { Shape } from '@ui/components/button/types';
import { SegmentPickerItemProps, Item } from './item/segment-picker-item';

export const SegmentPickerContext =
  createContext<SegmentPickerContextType | null>(null);

type SegmentPickerContextType = {
  selectedValue: string | null;
  onSelect: (
    event: MouseEventHandler<HTMLButtonElement>,
    value: string,
  ) => void;
  size?: Size;
  shape?: Shape;
};

type SegmentPickerProps = {
  children: ReactElement<SegmentPickerItemProps, typeof Item>[];
  value: string;
  size?: Size;
  /**
   * Controls the shape of the SegmentPicker and its items.
   * (default) -Items stretch to fill the container equally.
   * 'circle' - Items fit tightly around their content to maintain a circular shape.
   * Only supported when items contain icons only.
   */
  shape?: Shape;
  className?: string;
  onChange?: (
    event: MouseEventHandler<HTMLButtonElement>,
    value: string,
  ) => void;
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

    const handleSelect = (
      event: React.MouseEventHandler<HTMLButtonElement>,
      newValue: string,
    ) => {
      setSelectedValue(newValue);
      onChange?.(event, newValue);
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

import clsx from 'clsx';
import itemShapeStyles from './segment-picker-item-shape.module.css';

import { NavLabelButtonProps } from '@ui/components/button/nav-button/nav-label-button/nav-label-button';
import { NavIconButtonProps } from '@ui/components/button/nav-button/nav-icon-button/nav-icon-button';
import { NavIconLabelButtonProps } from '@ui/components/button/nav-button/nav-icon-label-button/nav-icon-label-button';
import {
  hasStringChildrenOnly,
  hasIconChildrenOnly,
  hasChildrenWithStringAndIcons,
} from '@ui/components/button/guards';
import { NavButton } from '@ui/components/button/nav-button/nav-button';
import { SegmentPickerContext } from '../segment-picker';
import { MouseEventHandler, useContext } from 'react';
import { BaseButtonProps } from '../../button/types';

export type SegmentPickerItemProps = BaseButtonProps & {
  value: string;
} & (
    | Pick<NavLabelButtonProps, 'children'>
    | Pick<NavIconButtonProps, 'children'>
    | Pick<NavIconLabelButtonProps, 'children'>
  );

export function Item({
  children,
  value,
  ...buttonProps
}: SegmentPickerItemProps) {
  const context = useContext(SegmentPickerContext);

  if (!context) {
    throw new Error('SegmentPicker.Item must be used within a SegmentPicker');
  }

  const { selectedValue, onSelect, shape, ...other } = context;

  const props = {
    className: clsx(itemShapeStyles['item'], itemShapeStyles[shape || '']),
    isSelected: selectedValue === value,
    onClick: (event: MouseEventHandler<HTMLButtonElement>) =>
      onSelect(event, value),
    shape,
    children,
    ...other,
    ...buttonProps,
  };

  if (hasStringChildrenOnly<NavLabelButtonProps>(props)) {
    return <NavButton {...props} />;
  }

  if (hasIconChildrenOnly<NavIconButtonProps>(props)) {
    return <NavButton {...props} />;
  }

  if (hasChildrenWithStringAndIcons<NavIconLabelButtonProps>(props)) {
    return <NavButton {...props} />;
  }

  return null;
}

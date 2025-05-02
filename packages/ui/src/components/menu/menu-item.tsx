import clsx from 'clsx';
import listItemStyles from '@ui/shared/styles/list-item.module.css';
import listItemSize from '@ui/shared/styles/list-item-size.module.css';
import { MenuItem as MenuItemBase } from '@mui/base';
import { MenuItemProps } from './types';

export function MenuItem({
  icon,
  label,
  disabled,
  destructive,
  size = 'medium',
  onClick,
}: MenuItemProps) {
  return (
    <MenuItemBase
      disabled={disabled}
      className={clsx(listItemStyles['list-item'], listItemSize[size], {
        [listItemStyles['destructive']]: destructive,
      })}
      onClick={onClick}
    >
      {icon}
      {label}
    </MenuItemBase>
  );
}

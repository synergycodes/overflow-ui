import clsx from 'clsx';
import listItemStyles from '@ui/shared/styles/list-item.module.css';
import listItemSize from '@ui/shared/styles/list-item-size.module.css';
import { Option } from '@mui/base';
import type { SelectItem } from '../types';
import type { ItemSize } from '@ui/shared/types/item-size';

type SelectOptionProps = SelectItem & {
  size?: ItemSize;
};

export function SelectOption({
  icon,
  value,
  label,
  size = 'medium',
  ...props
}: SelectOptionProps) {
  return (
    <Option
      className={clsx(listItemStyles['list-item'], listItemSize[size])}
      value={value}
      {...props}
    >
      {icon}
      {label}
    </Option>
  );
}

import clsx from 'clsx';
import listItemStyles from '../../shared/styles/list-item.module.css';
import listItemSize from '../../shared/styles/list-item-size.module.css';

import { Option } from '@mui/base';
import { SelectItem } from '../types';
import { Size } from '../../shared/types/label-size';

type SelectOptionProps = SelectItem & {
  size?: Size;
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

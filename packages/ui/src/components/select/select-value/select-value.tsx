import style from './select-value.module.css';

import type { SelectOption } from '@mui/base';
import type { SelectItem } from '../types';
import clsx from 'clsx';

type SelectValueProps = {
  selectedOptionLabel: SelectOption<string | number> | null;
  items: SelectItem[];
  placeholder?: string;
};

export function SelectValue({
  selectedOptionLabel,
  items,
  placeholder,
}: SelectValueProps) {
  const value = selectedOptionLabel?.label ?? placeholder;
  const selectedOption = items.find(
    (item) => item.value === selectedOptionLabel?.value,
  );

  return (
    <div className={style['container']}>
      {selectedOption?.icon}
      <span
        className={clsx({
          [style['placeholder']]: selectedOptionLabel == null,
        })}
      >
        {value}
      </span>
    </div>
  );
}

import style from './select-value.module.css';

import type { SelectOption } from '@mui/base';
import type { SelectItem } from '../types';
import clsx from 'clsx';

type SelectValueProps = {
  // Currently selected option label (or null if nothing is selected)
  selectedOptionLabel: SelectOption<string | number> | null;

  // List of selectable items
  items: SelectItem[];

  // Optional placeholder text when no option is selected
  placeholder?: string;

  // Optional class name for styling the component
  className?: string;
};

// Component that displays the selected option or a placeholder
export function SelectValue({
  selectedOptionLabel,
  items,
  placeholder,
  className,
}: SelectValueProps) {
  const value = selectedOptionLabel?.label ?? placeholder;
  const selectedOption = items.find(
    (item) => item.value === selectedOptionLabel?.value,
  );

  return (
    <div className={clsx(style['container'], className)}>
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

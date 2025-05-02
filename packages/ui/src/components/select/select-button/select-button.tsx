import type { SelectRootSlotProps } from '@mui/base';
import { CaretDown } from '@phosphor-icons/react';
import type { WithIcon } from '@ui/shared/types/with-icon';
import React from 'react';

export const SelectButton = React.forwardRef(function Button<
  TValue extends object,
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple> & WithIcon,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { icon, ownerState: _, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      {icon ?? <CaretDown weight="bold" />}
    </button>
  );
});

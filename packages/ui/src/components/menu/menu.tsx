import listBoxStyles from '@/axiom/shared/styles/list-box.module.css';
import clsx from 'clsx';

import { memo, ReactElement, useMemo } from 'react';
import { Dropdown, MenuButton } from '@mui/base';
import { Menu as MenuBase, MenuProps as MenuBaseProps } from '@mui/base/Menu';
import { MenuItem } from './menu-item';
import { MenuItemProps } from './types';
import { Size } from '@/axiom/shared/types/label-size';
import { Separator } from '@/axiom/separator/separator';
import { Placement } from '@floating-ui/react';
import { createTriggerButton } from './utils/create-trigger-button';

type MenuProps = MenuBaseProps & {
  items: MenuItemProps[];
  size?: Size;
  placement?: Placement | undefined;
  children: ReactElement;
};

export const Menu = memo(
  ({
    items,
    size = 'medium',
    placement = 'bottom-end',
    children,
    slotProps,
    ...props
  }: MenuProps) => {
    const MenuTriggerButton = useMemo(
      () => createTriggerButton(children),
      [children],
    );

    return (
      <Dropdown>
        <MenuButton slots={{ root: MenuTriggerButton }} />
        <MenuBase
          slotProps={{
            listbox: {
              className: listBoxStyles['list-box'],
            },
            root: {
              placement: placement,
              className: clsx(listBoxStyles['popup']),
            },
            ...slotProps,
          }}
          {...props}
        >
          {items.map((item, index) =>
            item.type === 'separator' ? (
              <Separator key={index} />
            ) : (
              <MenuItem key={item.label} {...item} size={size} />
            ),
          )}
        </MenuBase>
      </Dropdown>
    );
  },
);

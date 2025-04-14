import listBoxStyles from '@ui/shared/styles/list-box.module.css';
import clsx from 'clsx';

import { memo, ReactElement, useMemo } from 'react';
import { Dropdown, MenuButton } from '@mui/base';
import { Menu as MenuBase, MenuProps as MenuBaseProps } from '@mui/base/Menu';
import { MenuItem } from './menu-item';
import { MenuItemProps } from './types';
import { ItemSize } from '@ui/shared/types/item-size';
import { Separator } from '@ui/components/separator/separator';
import { Placement } from '@floating-ui/react';
import { createTriggerButton } from './utils/create-trigger-button';

type MenuProps = MenuBaseProps & {
  /**
   * Array of menu items to be rendered in the menu.
   * Each item can be either a regular menu item or a separator.
   */
  items: MenuItemProps[];

  /**
   * Size variant for the menu items.
   * @default 'medium'
   */
  size?: ItemSize;

  /**
   * The preferred placement of the menu relative to its trigger element.
   * Uses Floating UI placement options.
   * @default 'bottom-end'
   */
  placement?: Placement | undefined;

  /**
   * The trigger element that will open the menu when clicked.
   * This element will be wrapped in a button with appropriate ARIA attributes.
   */
  children: ReactElement;
};

/**
 * A customizable dropdown menu component.
 * The menu can be triggered by any React element passed as children.
 * Supports different sizes, custom placement, and can render both menu items and separators.
 */
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

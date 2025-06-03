import listBoxStyles from '@ui/shared/styles/list-box.module.css';
import clsx from 'clsx';

import {
  memo,
  ReactElement,
  useMemo,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import { Dropdown, MenuButton } from '@mui/base';
import { Menu as MenuBase, MenuProps as MenuBaseProps } from '@mui/base/Menu';
import { MenuItem } from './menu-item';
import { MenuItemProps } from './types';
import { ItemSize } from '@ui/shared/types/item-size';
import { Separator } from '@ui/components/separator/separator';
import { OffsetOptions, Placement } from '@floating-ui/react';
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
   * Controls whether the menu is open or closed.
   * When omitted, the menu's open state will be managed internally
   * and toggled by clicking on the `children` trigger element.
   */
  open?: boolean | undefined;

  /**
   * Callback fired when the component requests to be opened or closed.
   */
  onOpenChange?: (
    event: MouseEvent | KeyboardEvent | FocusEvent | null,
    open: boolean,
  ) => void;

  /**
   * Distance between a popup and the trigger element
   */
  offset?: OffsetOptions;
  /**
   * The trigger element that will open the menu when clicked.
   * This element will be wrapped in a button with appropriate ARIA attributes.
   */
  children?: ReactElement;
};

export const Menu = memo(
  ({
    items,
    size = 'medium',
    placement = 'bottom-end',
    children,
    slotProps,
    open,
    offset,
    onOpenChange,
    ...props
  }: MenuProps) => {
    const MenuTriggerButton = useMemo(() => {
      if (children) {
        return createTriggerButton(children);
      }
      return null;
    }, [children]);

    return (
      <Dropdown open={open} onOpenChange={onOpenChange}>
        {MenuTriggerButton && (
          <MenuButton slots={{ root: MenuTriggerButton }} />
        )}
        <MenuBase
          slotProps={{
            listbox: {
              className: listBoxStyles['list-box'],
            },
            root: {
              placement: placement,
              className: clsx(listBoxStyles['popup']),
              offset,
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

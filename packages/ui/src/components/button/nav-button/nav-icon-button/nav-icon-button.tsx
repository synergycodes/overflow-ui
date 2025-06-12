import clsx from 'clsx';

import borderRadiusStyles from '../../styles/border-radius.module.css';
import iconSizeStyles from '../../styles/icon-size.module.css';
import iconPaddingStyles from '../../styles/icon-padding.module.css';
import navIconButtonStyles from './nav-icon-button.module.css';

import { BaseButton } from '../../base-button/base-button';
import { forwardRef } from 'react';
import { IconNode, Shape } from '../../types';
import { NavBaseButtonProps } from '../types';
/**
 * IconButton is a specialized button component that displays only an icon.
 * Features: accepts any icon component, supports multiple visual variants (primary, secondary, etc.),
 * configurable sizes (small, medium, large), customizable shapes (circle or default),
 * maintains accessibility through BaseButton inheritance, and fully customizable through standard button props.
 */

export type NavIconButtonProps = {
  shape?: Shape;
  iconOnly?: boolean;
  children: IconNode;
} & NavBaseButtonProps;

export const NavIconButton = forwardRef<HTMLButtonElement, NavIconButtonProps>(
  ({ size = 'medium', shape = '', children, iconOnly, ...props }, ref) => (
    <BaseButton
      ref={ref}
      styles={clsx(
        iconPaddingStyles[size],
        iconSizeStyles[size],
        borderRadiusStyles[shape],
        borderRadiusStyles[size],
        { [navIconButtonStyles['icon-only']]: iconOnly },
      )}
      {...props}
    >
      {children}
    </BaseButton>
  ),
);

import clsx from 'clsx';

import borderRadiusStyles from '../../styles/border-radius.module.css';
import iconSizeStyles from '../../styles/icon-size.module.css';
import navIconSizeStyles from '../styles/nav-icon-size.module.css';
import iconPaddingStyles from '../../styles/icon-padding.module.css';
import navIconPaddingStyles from './nav-icon-padding.module.css';
import navIconButtonStyles from './nav-icon-button.module.css';

import { BaseButton } from '../../base-button/base-button';
import { forwardRef } from 'react';
import { IconNode, Shape } from '../../types';
import { NavBaseButtonProps } from '../types';

export type NavIconButtonProps = {
  shape?: Shape;
  transparent?: boolean;
  children: IconNode;
} & NavBaseButtonProps;

export const NavIconButton = forwardRef<HTMLButtonElement, NavIconButtonProps>(
  ({ size = 'medium', shape = '', children, transparent, ...props }, ref) => (
    <BaseButton
      ref={ref}
      styles={clsx(
        iconPaddingStyles[size],
        navIconPaddingStyles[size],
        iconSizeStyles[size],
        navIconSizeStyles[size],
        borderRadiusStyles[shape],
        { [navIconButtonStyles['transparent']]: transparent },
      )}
      {...props}
    >
      {children}
    </BaseButton>
  ),
);

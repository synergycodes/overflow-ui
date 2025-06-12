import clsx from 'clsx';

import borderRadiusStyles from '../../styles/border-radius.module.css';
import fontSizeStyles from '../../styles/font-size.module.css';
import paddingStyles from '../../styles/label-button-padding.module.css';

import { BaseButton } from '../../base-button/base-button';
import { forwardRef } from 'react';
import { NavBaseButtonProps } from '../types';

export type NavLabelButtonProps = {
  children: string;
} & NavBaseButtonProps;

/**
 * LabelButton is a versatile button component that displays text content with enhanced functionality.
 * Features: displays a text label with customizable styling, supports multiple visual variants (primary, secondary, etc.),
 * configurable sizes (small, medium, large), built-in loading state with animated indicator,
 * maintains accessibility through BaseButton inheritance, and fully customizable through standard button props.
 */
export const NavLabelButton = forwardRef<
  HTMLButtonElement,
  NavLabelButtonProps
>(({ size = 'medium', children, ...props }, ref) => (
  <BaseButton
    ref={ref}
    styles={clsx(
      borderRadiusStyles[size],
      fontSizeStyles[size],
      paddingStyles[size],
    )}
    {...props}
  >
    {children}
  </BaseButton>
));

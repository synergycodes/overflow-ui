import clsx from 'clsx';

import fontSizeStyles from '../../styles/font-size.module.css';
import navFontSizeStyles from '../styles/nav-button-font-size.module.css';
import iconSizeStyles from '../../styles/icon-size.module.css';
import navIconSizeStyles from '../styles/nav-icon-size.module.css';
import paddingStyles from '../../styles/icon-label-button-padding.module.css';
import navPaddingStyles from './nav-icon-label-button-padding.module.css';
import gapStyles from '../../styles/gap.module.css';
import navGapStyles from './nav-button-gap.module.css';

import { forwardRef } from 'react';
import { BaseButton } from '../../base-button/base-button';
import { IconNode } from '../../types';
import { NavBaseButtonProps } from '../types';

export type NavIconLabelButtonProps = {
  children:
    | [IconNode, string]
    | [string, IconNode]
    | [IconNode, string, IconNode];
} & NavBaseButtonProps;

/**
 * IconLabelButton is a flexible button component that combines icons and text in specific patterns.
 * Features: supports three distinct content patterns (icon + text, text + icon, or icon + text + icon),
 * accepts any React node as icons, supports multiple visual variants (primary, secondary, etc.),
 * configurable sizes (small, medium, large), maintains accessibility through BaseButton inheritance,
 * and fully customizable through standard button props. The component enforces strict content patterns
 * to ensure consistent and accessible button layouts.
 */
export const NavIconLabelButton = forwardRef<
  HTMLButtonElement,
  NavIconLabelButtonProps
>(({ size = 'medium', children, ...props }, ref) => (
  <BaseButton
    ref={ref}
    styles={clsx(
      fontSizeStyles[size],
      navFontSizeStyles[size],
      iconSizeStyles[size],
      navIconSizeStyles[size],
      paddingStyles[size],
      navPaddingStyles[size],
      gapStyles[size],
      navGapStyles[size],
    )}
    {...props}
  >
    {children}
  </BaseButton>
));

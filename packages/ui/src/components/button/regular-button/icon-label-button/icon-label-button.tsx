import clsx from 'clsx';

import borderRadiusStyles from '../../styles/border-radius.module.css';
import fontSizeStyles from '../../styles/font-size.module.css';
import iconSizeStyles from '../../styles/icon-size.module.css';
import paddingStyles from '../../styles/icon-label-button-padding.module.css';

import { forwardRef } from 'react';
import { BaseButton } from '../../base-button/base-button';
import { IconNode } from '../../types';
import { BaseRegularButtonProps } from '../types';

export type IconLabelButtonProps = {
  children:
    | [IconNode, string]
    | [string, IconNode]
    | [IconNode, string, IconNode];
} & BaseRegularButtonProps;

/**
 * IconLabelButton is a flexible button component that combines icons and text in specific patterns.
 * Features: supports three distinct content patterns (icon + text, text + icon, or icon + text + icon),
 * accepts any React node as icons, supports multiple visual variants (primary, secondary, etc.),
 * configurable sizes (small, medium, large), maintains accessibility through BaseButton inheritance,
 * and fully customizable through standard button props. The component enforces strict content patterns
 * to ensure consistent and accessible button layouts.
 */
export const IconLabelButton = forwardRef<
  HTMLButtonElement,
  IconLabelButtonProps
>(({ size = 'medium', children, ...props }, ref) => (
  <BaseButton
    ref={ref}
    styles={clsx(
      borderRadiusStyles[size],
      fontSizeStyles[size],
      iconSizeStyles[size],
      paddingStyles[size],
    )}
    {...props}
  >
    {children}
  </BaseButton>
));

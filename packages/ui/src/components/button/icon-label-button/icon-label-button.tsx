import clsx from 'clsx';

import variantStyles from '../styles/variant.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import fontSizeStyles from '../styles/font-size.module.css';
import iconSizeStyles from '../styles/icon-size.module.css';
import paddingStyles from './padding.module.css';

import { Variant, BaseButtonProps } from '../types';
import { forwardRef } from 'react';
import { BaseButton } from '../base-button/base-button';
import { Size } from '@ui/shared/types/size';

type IconNode = React.ReactNode;
type IconLabelButtonProps = {
  /** The visual style variant of the button */
  variant?: Variant;
  /** The size of the button */
  size?: Size;
  /** The children of the button, must follow specific patterns */
  children: AllowedChildren;
};

/**
 * Allowed patterns for children in IconLabelButton
 */
type AllowedChildren =
  | [IconNode, string]
  | [string, IconNode]
  | [IconNode, string, IconNode];

/**
 * IconLabelButton is a flexible button component that combines icons and text.
 * It supports specific patterns of children arrangement:
 * - Icon followed by text
 * - Text followed by an icon
 * - Icon, text, and another icon
 */
export const IconLabelButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps<IconLabelButtonProps>
>(({ size = 'medium', variant = 'primary', children, ...props }, ref) => (
  <BaseButton
    ref={ref}
    size={size}
    styles={clsx(
      variantStyles[variant],
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

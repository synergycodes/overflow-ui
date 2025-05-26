import clsx from 'clsx';

import variantStyles from '../styles/variant.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import iconSizeStyles from '../styles/icon-size.module.css';
import iconPaddingStyles from '../styles/icon-padding.module.css';

import { Variant, Shape, BaseButtonProps } from '../types';
import { BaseButton } from '../base-button/base-button';
import { forwardRef, ReactNode } from 'react';

type IconButtonProps = {
  /** The icon component to display */
  icon: ReactNode;
  /** The visual style variant of the button */
  variant?: Variant;
  /** The shape of the button (circle or default) */
  shape?: Shape;
};

/**
 * IconButton is a specialized button component that displays only an icon.
 * Features: accepts any icon component, supports multiple visual variants (primary, secondary, etc.),
 * configurable sizes (small, medium, large), customizable shapes (circle or default),
 * maintains accessibility through BaseButton inheritance, and fully customizable through standard button props.
 */
export const IconButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps<IconButtonProps>
>(
  (
    { size = 'medium', variant = 'primary', shape = '', icon, ...props },
    ref,
  ) => (
    <BaseButton
      ref={ref}
      size={size}
      styles={clsx(
        variantStyles[variant],
        iconPaddingStyles[size],
        iconSizeStyles[size],
        borderRadiusStyles[shape],
        borderRadiusStyles[size],
      )}
      {...props}
    >
      {icon}
    </BaseButton>
  ),
);

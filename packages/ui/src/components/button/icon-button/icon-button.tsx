import clsx from 'clsx';

import variantStyles from '../styles/variant.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import iconSizeStyles from '../styles/icon-size.module.css';
import iconPaddingStyles from '../styles/icon-padding.module.css';

import { Variant, Shape, BaseButtonProps } from '../types';
import type { Icon } from '@phosphor-icons/react';
import { BaseButton } from '../base-button/base-button';
import { forwardRef } from 'react';
import { Size } from '@ui/shared/types/size';

type IconButtonProps = {
  /** The icon component to display */
  Icon: Icon;
  /** The visual style variant of the button */
  variant?: Variant;
  /** The size of the button */
  size?: Size;
  /** The shape of the button (circle or default) */
  shape?: Shape;
};

/**
 * IconButton is a button component that displays only an icon.
 */
export const IconButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps<IconButtonProps>
>(
  (
    { size = 'medium', variant = 'primary', shape = '', Icon, ...props },
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
      <Icon />
    </BaseButton>
  ),
);

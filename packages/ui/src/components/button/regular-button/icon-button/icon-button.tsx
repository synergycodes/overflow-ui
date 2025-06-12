import clsx from 'clsx';

import borderRadiusStyles from '../../styles/border-radius.module.css';
import iconSizeStyles from '../../styles/icon-size.module.css';
import iconPaddingStyles from '../../styles/icon-padding.module.css';

import { BaseButton } from '../../base-button/base-button';
import { forwardRef } from 'react';
import { IconNode, Shape } from '../../types';
import { BaseRegularButtonProps } from '../types';
/**
 * IconButton is a specialized button component that displays only an icon.
 * Features: accepts any icon component, supports multiple visual variants (primary, secondary, etc.),
 * configurable sizes (small, medium, large), customizable shapes (circle or default),
 * maintains accessibility through BaseButton inheritance, and fully customizable through standard button props.
 */

export type IconButtonProps = {
  shape?: Shape;
  children: IconNode;
} & BaseRegularButtonProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'medium', shape = '', children, ...props }, ref) => (
    <BaseButton
      ref={ref}
      styles={clsx(
        iconPaddingStyles[size],
        iconSizeStyles[size],
        borderRadiusStyles[shape],
        borderRadiusStyles[size],
      )}
      {...props}
    >
      {children}
    </BaseButton>
  ),
);

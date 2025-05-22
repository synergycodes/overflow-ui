import clsx from 'clsx';

import variantStyles from '../styles/variant.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import fontSizeStyles from '../styles/font-size.module.css';
import paddingStyles from './padding.module.css';
import loaderStyles from './loader.module.css';

import { Variant, BaseButtonProps } from '../types';
import { BaseButton } from '../base-button/base-button';
import { forwardRef } from 'react';

type LabelButtonProps = {
  /** The text label displayed on the button */
  label: string;
  /** The visual style variant of the button */
  variant?: Variant;
  /** Whether to show a loading state */
  isLoading?: boolean;
};
/**
 * LabelButton is a versatile button component that displays text content with enhanced functionality.
 * Features: displays a text label with customizable styling, supports multiple visual variants (primary, secondary, etc.),
 * configurable sizes (small, medium, large), built-in loading state with animated indicator,
 * maintains accessibility through BaseButton inheritance, and fully customizable through standard button props.
 */
export const LabelButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps<LabelButtonProps>
>(
  (
    { size = 'medium', variant = 'primary', label, isLoading, ...props },
    ref,
  ) => (
    <BaseButton
      ref={ref}
      styles={clsx(
        variantStyles[variant],
        borderRadiusStyles[size],
        fontSizeStyles[size],
        paddingStyles[size],
        { [loaderStyles['disable-events']]: isLoading },
      )}
      {...props}
    >
      {
        <span className={clsx({ [loaderStyles['hide-label']]: isLoading })}>
          {label}
        </span>
      }
      {isLoading && <span className={loaderStyles['dot-flashing']}></span>}
    </BaseButton>
  ),
);

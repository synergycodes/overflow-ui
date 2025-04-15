import clsx from 'clsx';

import variantStyles from '../styles/variant.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import fontSizeStyles from '../styles/font-size.module.css';
import paddingStyles from './padding.module.css';
import loaderStyles from './loader.module.css';

import { Variant, BaseButtonProps } from '../types';
import { BaseButton } from '../base-button/base-button';
import { forwardRef } from 'react';
import { Size } from '@ui/shared/types/size';

type LabelButtonProps = {
  /** The text label displayed on the button */
  label: string;
  /** The visual style variant of the button */
  variant?: Variant;
  /** The size of the button */
  size?: Size;
  /** Whether to show a loading state */
  isLoading?: boolean;
};

/**
 * LabelButton is a button component that displays text with optional loading state.
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

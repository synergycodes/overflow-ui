import clsx from 'clsx';

import variantStyles from '../styles/variant.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import fontSizeStyles from '../styles/font-size.module.css';
import paddingStyles from './padding.module.css';
import loaderStyles from './loader.module.css';

import { Variant, Size, BaseButtonProps } from '../types';
import { BaseButton } from '../base-button/base-button';
import { forwardRef } from 'react';

type LabelButtonProps = {
  label: string;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

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

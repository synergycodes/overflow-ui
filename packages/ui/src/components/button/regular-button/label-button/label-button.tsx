import clsx from 'clsx';

import fontSizeStyles from '../../styles/font-size.module.css';
import paddingStyles from '../../styles/label-button-padding.module.css';
import loaderStyles from './loader.module.css';

import { BaseButton } from '../../base-button/base-button';
import { forwardRef } from 'react';
import { BaseRegularButtonProps } from '../types';

export type LabelButtonProps = {
  isLoading?: boolean;
  children: string;
} & BaseRegularButtonProps;

/**
 * LabelButton is a versatile button component that displays text content with enhanced functionality.
 * Features: displays a text label with customizable styling, supports multiple visual variants (primary, secondary, etc.),
 * configurable sizes (small, medium, large), built-in loading state with animated indicator,
 * maintains accessibility through BaseButton inheritance, and fully customizable through standard button props.
 */
export const LabelButton = forwardRef<HTMLButtonElement, LabelButtonProps>(
  ({ size = 'medium', isLoading, children, ...props }, ref) => (
    <BaseButton
      ref={ref}
      styles={clsx(fontSizeStyles[size], paddingStyles[size], {
        [loaderStyles['disable-events']]: isLoading,
      })}
      {...props}
    >
      {
        <span className={clsx({ [loaderStyles['hide-label']]: isLoading })}>
          {children}
        </span>
      }
      {isLoading && <span className={loaderStyles['dot-flashing']}></span>}
    </BaseButton>
  ),
);

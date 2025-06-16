import clsx from 'clsx';

import fontSizeStyles from '../../styles/font-size.module.css';
import iconSizeStyles from '../../styles/icon-size.module.css';
import paddingStyles from '../../styles/icon-label-button-padding.module.css';
import gapStyles from '../../styles/gap.module.css';

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

export const IconLabelButton = forwardRef<
  HTMLButtonElement,
  IconLabelButtonProps
>(({ size = 'medium', children, ...props }, ref) => (
  <BaseButton
    ref={ref}
    styles={clsx(
      fontSizeStyles[size],
      iconSizeStyles[size],
      paddingStyles[size],
      gapStyles[size],
    )}
    {...props}
  >
    {children}
  </BaseButton>
));

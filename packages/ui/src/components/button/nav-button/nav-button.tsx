import clsx from 'clsx';

import iconSizeStyles from '../styles/icon-size.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import paddingStyles from '../styles/icon-padding.module.css';
import navButtonStyles from './nav-button.module.css';

import { Shape, BaseButtonProps } from '../types';
import { BaseButton } from '../base-button/base-button';
import { forwardRef } from 'react';
import { Size } from '@ui/shared/types/size';

type NavButtonSize = Size | 'xx-small' | 'xxx-small' | 'xxxx-small';

type NavButtonProps = {
  icon: React.ReactNode;
  size?: NavButtonSize;
  shape?: Shape;
  noBackground?: boolean;
};

export const NavButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps<NavButtonProps>
>(({ size = 'medium', shape = '', icon, noBackground, ...props }, ref) => (
  <BaseButton
    ref={ref}
    styles={clsx(
      navButtonStyles['nav-button'],
      { [navButtonStyles['no-background']]: noBackground },
      paddingStyles[size],
      iconSizeStyles[size],
      borderRadiusStyles[shape],
      borderRadiusStyles[size],
    )}
    {...props}
  >
    {icon}
  </BaseButton>
));

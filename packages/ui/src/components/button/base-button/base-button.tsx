import clsx from 'clsx';
import buttonStyles from './base-button.module.css';

import { Button } from '@mui/base/Button';
import { BaseButtonProps } from '../types';
import { forwardRef } from 'react';
import { prepareForSlot } from '@mui/base';
import { Tooltip } from '@ui/components/tooltip/tooltip';

type Props = {
  /** Class name meant to be used by parent components using <BaseButton /> directly */
  styles: string;
  children: React.ReactNode;
} & BaseButtonProps;

export const BaseButton = prepareForSlot(
  forwardRef<HTMLButtonElement, Props>(
    (
      {
        children,
        styles,
        className,
        tooltip,
        disabled,
        tooltipType = 'default',
        ...props
      },
      ref,
    ) => {
      const button = (
        <Button
          ref={ref}
          className={clsx(buttonStyles['button'], styles, className)}
          disabled={disabled}
          {...props}
        >
          {children}
        </Button>
      );

      return tooltip && !disabled ? (
        <Tooltip>
          <Tooltip.Trigger>{button}</Tooltip.Trigger>
          <Tooltip.Content tooltipType={tooltipType}>{tooltip}</Tooltip.Content>
        </Tooltip>
      ) : (
        button
      );
    },
  ),
);

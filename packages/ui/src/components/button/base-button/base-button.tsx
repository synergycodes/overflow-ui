import clsx from 'clsx';
import buttonStyles from './base-button.module.css';
import gapStyles from './gap.module.css';

import { Button } from '@mui/base/Button';
import { BaseButtonProps, CommonButtonProps } from '../types';
import { forwardRef } from 'react';
import { prepareForSlot } from '@mui/base';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ui/components/tooltip/tooltip';
import { Size } from '@ui/shared/types/size';

type Props = {
  /** Class name meant to be used by parent components using <BaseButton /> directly */
  styles: string;
  children: React.ReactNode;
  size?: Size;
} & CommonButtonProps;

export const BaseButton = prepareForSlot(
  forwardRef<HTMLButtonElement, BaseButtonProps<Props>>(
    (
      {
        children,
        styles,
        className,
        tooltip,
        disabled,
        tooltipType = 'default',
        size = 'medium',
        ...props
      },
      ref,
    ) => {
      const button = (
        <Button
          ref={ref}
          className={clsx(
            buttonStyles['button'],
            gapStyles[size],
            styles,
            className,
          )}
          disabled={disabled}
          {...props}
        >
          {children}
        </Button>
      );

      return tooltip && !disabled ? (
        <Tooltip>
          <TooltipTrigger>{button}</TooltipTrigger>
          <TooltipContent tooltipType={tooltipType}>{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        button
      );
    },
  ),
);

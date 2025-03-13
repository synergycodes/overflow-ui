import clsx from 'clsx';
import buttonStyles from './base-button.module.css';
import '../variables.css';

import { Button } from '@mui/base/Button';
import { BaseButtonProps, CommonButtonProps } from '../types';
import { forwardRef } from 'react';
import { prepareForSlot } from '@mui/base';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/axiom/tooltip/tooltip';

type Props = {
  /** Class name meant to be used by parent components using <BaseButton /> directly */
  styles: string;
  children: React.ReactNode;
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
          <TooltipTrigger>{button}</TooltipTrigger>
          <TooltipContent tooltipType={tooltipType}>{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        button
      );
    },
  ),
);

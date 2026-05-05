import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTooltipPlacement } from './tooltip';
import styles from './tooltip.module.css';
import { TooltipVariant } from './types';

const TOOLTIP_OFFSET = 10;
const TOOLTIP_COLLISION_PADDING = 5;

/**
 * Tooltips Content is the component that pops out when the tooltip is open.
 */
export const TooltipContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & {
    /**
     * TooltipType determines the color type of the tooltip
     */
    tooltipType?: TooltipVariant;
  }
>(function TooltipContent(
  { style, tooltipType = 'default', children, className, ...props },
  propRef,
) {
  const { side, align } = useTooltipPlacement();

  if (!children) return null;

  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        align={align}
        sideOffset={TOOLTIP_OFFSET}
        collisionPadding={TOOLTIP_COLLISION_PADDING}
        arrowPadding={TOOLTIP_COLLISION_PADDING}
      >
        <BaseTooltip.Popup
          ref={propRef}
          className={clsx(
            styles['container'],
            {
              [styles['tooltip-default']]: tooltipType === 'default',
              [styles['tooltip-blue']]: tooltipType === 'blue',
            },
            'ax-public-p11',
            className,
          )}
          style={style}
          {...props}
        >
          {children}
          <BaseTooltip.Arrow
            className={clsx(styles['arrow'], {
              [styles['arrow-default']]: tooltipType === 'default',
              [styles['arrow-blue']]: tooltipType === 'blue',
            })}
          >
            <svg
              width="10"
              height="4"
              viewBox="0 0 10 4"
              fill="currentColor"
              style={{ display: 'block' }}
              aria-hidden="true"
            >
              <path d="M0 0 L5 4 L10 0 Z" />
            </svg>
          </BaseTooltip.Arrow>
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
});

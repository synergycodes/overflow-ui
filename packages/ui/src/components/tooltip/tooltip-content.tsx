import { forwardRef } from 'react';
import { TooltipVariant } from './types';
import { useTooltipContext } from './tooltip';
import {
  FloatingArrow,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import clsx from 'clsx';
import styles from './tooltip.module.css';

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
  { style, tooltipType = 'default', ...props },
  propRef,
) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context?.refs.setFloating, propRef]);

  if (!context?.open || !props.children) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        className={clsx(
          styles['container'],
          {
            [styles['tooltip-default']]: tooltipType === 'default',
            [styles['tooltip-blue']]: tooltipType === 'blue',
          },
          'ax-public-p11',
        )}
        style={{
          ...context.floatingStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
      >
        {props.children}
        <FloatingArrow
          ref={context.arrowRef}
          fill={getComputedStyle(document.documentElement).getPropertyValue(
            '--tooltipBackgroundColor',
          )}
          width={10}
          height={4}
          context={context.context}
        />
      </div>
    </FloatingPortal>
  );
});

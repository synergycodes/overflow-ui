import clsx from 'clsx';
import styles from './tooltip.module.css';
import './variables.css';

import {
  useMergeRefs,
  FloatingPortal,
  FloatingArrow,
} from '@floating-ui/react';
import { TooltipVariant } from './types';
import { TooltipOptions, useTooltip } from './use-tooltip';
import {
  createContext,
  useContext,
  forwardRef,
  cloneElement,
  isValidElement,
} from 'react';

type ContextType = ReturnType<typeof useTooltip> | null;
const TooltipContext = createContext<ContextType>(null);

export function useTooltipContext() {
  const context = useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
}

export function Tooltip({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

export const TooltipTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();

  const ref = useMergeRefs([context.refs.setReference, propRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

export const TooltipContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & { tooltipType?: TooltipVariant }
>(function TooltipContent(
  { style, tooltipType = 'default', ...props },
  propRef,
) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open || !props.children) return null;

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
          'p11',
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

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { cloneElement, forwardRef, isValidElement, ReactElement } from 'react';
import { useTooltipDelay } from './tooltip';

/**
 * Tooltips trigger is the the element that toggles the tooltip
 */
export const TooltipTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & {
    /**
     * `asChild` allows the user to pass any element as the anchor
     */
    asChild?: boolean;
  }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const { delay, closeDelay } = useTooltipDelay();

  return (
    <BaseTooltip.Trigger
      ref={propRef as React.Ref<HTMLButtonElement>}
      delay={delay}
      closeDelay={closeDelay}
      // Keep parity with the previous Floating UI behaviour: clicking the
      // trigger should not dismiss the tooltip while hover is still active.
      closeOnClick={false}
      render={(triggerProps, state) => {
        const dataState = state.open ? 'open' : 'closed';

        if (asChild && isValidElement(children)) {
          const childElement = children as ReactElement<
            Record<string, unknown>
          >;
          return cloneElement(childElement, {
            ...triggerProps,
            ...props,
            ...(childElement.props ?? {}),
            'data-state': dataState,
          });
        }

        return (
          <div {...triggerProps} {...props} data-state={dataState}>
            {children}
          </div>
        );
      }}
    />
  );
});

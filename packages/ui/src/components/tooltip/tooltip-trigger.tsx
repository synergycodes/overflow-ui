import { cloneElement, forwardRef, isValidElement } from 'react';
import { useTooltipContext } from './tooltip';
import { useMergeRefs } from '@floating-ui/react';

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
  const context = useTooltipContext();

  const ref = useMergeRefs([context?.refs.setReference, propRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context?.getReferenceProps({
        ref,
        ...props,
        ...(children.props ?? {}),
        'data-state': context.open ? 'open' : 'closed',
      } as React.HTMLProps<Element>),
    );
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context?.open ? 'open' : 'closed'}
      {...context?.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

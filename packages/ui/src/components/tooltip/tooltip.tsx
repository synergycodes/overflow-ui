import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { TooltipContent } from './tooltip-content';
import { TooltipTrigger } from './tooltip-trigger';

const TOOLTIP_OPEN_DELAY = 500;
const TOOLTIP_CLOSE_DELAY = 0;

/**
 * Tooltip placement matching the Floating UI shape that this component used
 * before the migration to Base UI. Kept verbatim to preserve the public API.
 */
export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type TooltipOptions = {
  /**
   * If true, the component is shown at initial
   */
  initialOpen?: boolean;
  /**
   * Tooltip placement.
   */
  placement?: TooltipPlacement;
  /**
   *  If true, the component is shown.
   */
  open?: boolean;
  /**
   * Callback fired when the component requests to be open.
   */
  onOpenChange?: (open: boolean) => void;
};

type PlacementContextValue = {
  side: 'top' | 'bottom' | 'left' | 'right';
  align: 'start' | 'center' | 'end';
};

const TooltipPlacementContext = createContext<PlacementContextValue>({
  side: 'bottom',
  align: 'center',
});

export function useTooltipPlacement(): PlacementContextValue {
  return useContext(TooltipPlacementContext);
}

function placementToSideAlign(
  placement: TooltipPlacement,
): PlacementContextValue {
  const [side, align] = placement.split('-') as [
    PlacementContextValue['side'],
    PlacementContextValue['align'] | undefined,
  ];
  return { side, align: align ?? 'center' };
}

type Props = {
  /**
   * Tooltip reference element.
   */
  children: ReactNode;
} & TooltipOptions;

/**
 * Interactions a controlled tooltip ignores. Before the migration the
 * Floating UI hover/focus interactions were disabled entirely whenever
 * `open` was controlled (the parent has sole authority); dismissal
 * (Escape/outside press) stayed active. Base UI keeps all interactions
 * routed through onOpenChange, so the hover/focus reasons are filtered
 * out here to preserve that contract.
 */
const HOVER_FOCUS_REASONS = new Set<string>([
  'trigger-hover',
  'trigger-focus',
  'focus-out',
]);

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 */
export function Tooltip({
  children,
  initialOpen,
  placement = 'bottom',
  open,
  onOpenChange,
}: Props) {
  const isControlled = open !== undefined;
  const placementValue = useMemo(
    () => placementToSideAlign(placement),
    [placement],
  );

  return (
    <TooltipPlacementContext.Provider value={placementValue}>
      <BaseTooltip.Root
        defaultOpen={initialOpen}
        open={open}
        onOpenChange={
          onOpenChange
            ? (nextOpen, eventDetails) => {
                if (
                  isControlled &&
                  HOVER_FOCUS_REASONS.has(eventDetails.reason)
                ) {
                  return;
                }
                onOpenChange(nextOpen);
              }
            : undefined
        }
      >
        <TooltipDelayApplier>{children}</TooltipDelayApplier>
      </BaseTooltip.Root>
    </TooltipPlacementContext.Provider>
  );
}

/**
 * Internal context that propagates the tooltip open/close delay to the trigger.
 * Base UI puts the `delay` and `closeDelay` props on `Tooltip.Trigger`, but to
 * preserve our wrapper's public API (delays applied automatically) we pass them
 * implicitly through this context.
 */
const TooltipDelayContext = createContext<{
  delay: number;
  closeDelay: number;
}>({
  delay: TOOLTIP_OPEN_DELAY,
  closeDelay: TOOLTIP_CLOSE_DELAY,
});

export function useTooltipDelay() {
  return useContext(TooltipDelayContext);
}

function TooltipDelayApplier({ children }: { children: ReactNode }) {
  return (
    <TooltipDelayContext.Provider
      value={{ delay: TOOLTIP_OPEN_DELAY, closeDelay: TOOLTIP_CLOSE_DELAY }}
    >
      {children}
    </TooltipDelayContext.Provider>
  );
}

Tooltip.Content = TooltipContent;
Tooltip.Trigger = TooltipTrigger;

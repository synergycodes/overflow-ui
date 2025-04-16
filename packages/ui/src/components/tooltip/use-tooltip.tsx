import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  arrow,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
  UseInteractionsReturn,
} from '@floating-ui/react';
import { useMemo, useRef, useState } from 'react';

const TOOLTIP_OFFSET = 10;
const TOOLTIP_PADDING = 5;
const TOOLTIP_OPEN_DELAY = 500;
const TOOLTIP_CLOSE_DELAY = 0;

export type TooltipOptions = {
  /**
   * If true, the component is shown at initial
   */
  initialOpen?: boolean;
  /**
   * Tooltip placement.
   */
  placement?: Placement;
  /**
   * 	If true, the component is shown.
   */
  open?: boolean;
  /**
   * Callback fired when the component requests to be open.
   */
  onOpenChange?: (open: boolean) => void;
};

export function useTooltip({
  initialOpen = false,
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipOptions = {}): UseTooltipResult {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  const arrowRef = useRef(null);

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(TOOLTIP_OFFSET),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: TOOLTIP_PADDING,
      }),
      shift({ padding: TOOLTIP_PADDING }),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    delay: {
      open: TOOLTIP_OPEN_DELAY,
      close: TOOLTIP_CLOSE_DELAY,
    },
    move: false,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      arrowRef,
    }),
    [open, setOpen, interactions, data, arrowRef],
  );
}

type UseTooltipResult = UseInteractionsReturn &
  ReturnType<typeof useFloating> & {
    open: boolean;
    setOpen: (open: boolean) => void;
    arrowRef: React.RefObject<null>;
  };

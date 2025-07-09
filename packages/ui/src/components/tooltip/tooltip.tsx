import { TooltipOptions, useTooltip } from './use-tooltip';
import { createContext, useContext, ReactNode } from 'react';
import { TooltipContent } from './tooltip-content';
import { TooltipTrigger } from './tooltip-trigger';

type ContextType = ReturnType<typeof useTooltip> | null;
const TooltipContext = createContext<ContextType>(null);

export function useTooltipContext(): ContextType | undefined {
  const context = useContext(TooltipContext);

  if (context) {
    return context;
  }

  console.error('Tooltip components must be wrapped in <Tooltip />');
}

type Props = {
  /**
   * Tooltip reference element.
   */
  children: ReactNode;
} & TooltipOptions;

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 */
export function Tooltip({ children, ...options }: Props) {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

Tooltip.Content = TooltipContent;
Tooltip.Trigger = TooltipTrigger;

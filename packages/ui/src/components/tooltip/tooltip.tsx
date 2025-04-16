import { TooltipOptions, useTooltip } from './use-tooltip';
import { createContext, useContext, ReactNode } from 'react';

type ContextType = ReturnType<typeof useTooltip> | null;
const TooltipContext = createContext<ContextType>(null);

export function useTooltipContext(): ContextType {
  const context = useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
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

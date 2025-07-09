import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
  useRef,
  RefObject,
} from 'react';
import { CaretUp } from '@phosphor-icons/react';
import clsx from 'clsx';
import styles from './collapsible.module.css';
import { NavButton } from '../button/nav-button/nav-button';
import { useTransitionEvent } from '../../shared/hooks/use-transition-event';

interface CollapsibleContextProps {
  isExpanded: boolean;
  toggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextProps | undefined>(
  undefined,
);

function useCollapsibleContext() {
  const context = useContext(CollapsibleContext);
  if (context) {
    return context;
  }

  console.error(
    '<Collapsible.Button> and <Collapsible.Content> must be used within <Collapsible>',
  );
}

type CollapsibleProps = {
  children: ReactNode;
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
};

export function Collapsible({
  children,
  isExpanded,
  defaultExpanded = false,
  onToggle,
}: CollapsibleProps) {
  const isControlled = isExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const actualExpanded = isControlled ? isExpanded : internalExpanded;

  const toggle = useCallback(() => {
    const next = !actualExpanded;
    if (!isControlled) {
      setInternalExpanded(next);
    }
    onToggle?.(next);
  }, [actualExpanded, isControlled, onToggle]);

  return (
    <CollapsibleContext.Provider value={{ isExpanded: actualExpanded, toggle }}>
      {children}
    </CollapsibleContext.Provider>
  );
}

Collapsible.Button = function CollapsibleButton() {
  const context = useCollapsibleContext();

  return (
    <NavButton
      className={clsx(styles['expand-button'], {
        [styles['expanded']]: context?.isExpanded,
      })}
      onClick={context?.toggle}
    >
      <CaretUp />
    </NavButton>
  );
};

Collapsible.Content = function CollapsibleContent({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const context = useCollapsibleContext();

  useOverflowDuringTransition(ref, context?.isExpanded || false);

  return (
    <div
      ref={ref}
      className={clsx(styles['content-wrapper'], {
        [styles['expanded']]: context?.isExpanded,
      })}
    >
      <div className={styles['content']}> {children}</div>
    </div>
  );
};

function useOverflowDuringTransition(
  ref: RefObject<HTMLElement | null>,
  isExpanded: boolean,
  transitionProp: string = 'grid-template-rows',
) {
  useTransitionEvent(ref, 'transitionstart', transitionProp, () => {
    if (!isExpanded && ref.current) {
      ref.current.style.overflow = 'hidden';
    }
  });

  useTransitionEvent(ref, 'transitionend', transitionProp, () => {
    if (isExpanded && ref.current) {
      ref.current.style.overflow = 'unset';
    }
  });
}

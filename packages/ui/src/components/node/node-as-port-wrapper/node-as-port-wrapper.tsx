import clsx from 'clsx';
import './node-as-port.css';

import { memo, PropsWithChildren, useCallback, useRef, useState } from 'react';

type Position = 'left' | 'top' | 'right' | 'bottom';

type Props = {
  isConnecting: boolean;
  targetPortPosition: Position;
  offset?: {
    x?: number;
    y?: number;
  };
};

export const NodeAsPortWrapper = memo(function NodeAsPortWrapper({
  isConnecting,
  offset = { x: 0, y: 0 },
  targetPortPosition,
  children,
}: PropsWithChildren<Props>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isConnectionTarget, setIsConnectionTarget] = useState(false);
  const canApplyStyles = isConnecting && isConnectionTarget;

  const containerStyles = canApplyStyles
    ? {
        '--ax-node-as-port-width': `${ref.current?.offsetWidth}px`,
        '--ax-node-as-port-height': `${ref.current?.offsetHeight}px`,
        '--ax-node-as-port-position':
          targetPortPosition === 'left'
            ? `translate(calc(-10% + ${offset.x}px), calc(-50% + ${offset.y}px))`
            : `translate(calc(-50% + ${offset.x}px), calc(-10% + ${offset.y}px))`,
      }
    : null;

  const onMouseEnter = useCallback(() => {
    if (isConnecting) {
      setIsConnectionTarget(true);
    }
  }, [isConnecting]);

  const onMouseLeave = useCallback(() => {
    setIsConnectionTarget(false);
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={containerStyles as React.CSSProperties}
      className={clsx({
        ['is-connection-target']: canApplyStyles,
      })}
    >
      {children}
    </div>
  );
});

import clsx from 'clsx';
import './node-as-port.css';

import { PropsWithChildren, useCallback, useRef, useState } from 'react';

type Position = 'left' | 'top' | 'right' | 'bottom';

type Props = {
  isConnecting: boolean;
  targetPortPosition: Position;
};

export function NodeAsPortWrapper({
  isConnecting,
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
            ? `translate(-10%, -50%)`
            : `translate(-50%, -10%)`,
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
}

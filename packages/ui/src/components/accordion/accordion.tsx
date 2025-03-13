import clsx from 'clsx';
import styles from './accordion.module.css';

import { forwardRef, useState } from 'react';
import { Separator } from '../separator/separator';
import { WithIcon } from '../shared/types/with-icon';
import { CaretUp } from '@phosphor-icons/react';
import { NavButton } from '../button/nav-button/nav-button';

type Props = React.HTMLAttributes<HTMLDivElement> &
  WithIcon & {
    label: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggleOpen?: (isOpen: boolean) => void;
    defaultOpen?: boolean;
  };

export const Accordion = forwardRef<HTMLDivElement, Props>(
  (
    {
      label,
      children,
      onToggleOpen,
      isOpen: isOpenProp,
      defaultOpen = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const isExpanded = isOpenProp ?? isOpen;

    function onExpandCollapse() {
      const newValue = !isExpanded;

      setIsOpen(newValue);
      onToggleOpen?.(newValue);
    }

    return (
      <div
        ref={ref}
        className={clsx(styles['accordion'], className)}
        {...props}
      >
        <div
          className={clsx(styles['header'], {
            [styles['expanded']]: isExpanded,
          })}
          onClick={onExpandCollapse}
          aria-expanded={isOpen}
        >
          <span className="h10">{label}</span>
          <NavButton className={styles['header-button']} icon={<CaretUp />} />
        </div>
        <div
          className={clsx(styles['inner-container'], {
            [styles['expanded']]: isExpanded,
          })}
        >
          <div className={styles['content']}>{children}</div>
        </div>
        <Separator />
      </div>
    );
  },
);

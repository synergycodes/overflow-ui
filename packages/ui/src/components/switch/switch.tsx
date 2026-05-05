import clsx from 'clsx';
import switchStyles from './switch.module.css';

import { Switch as SwitchBase } from '@base-ui/react/switch';
import { ChangeEvent } from 'react';
import { SelectorSize } from '@ui/shared/types/selector-size';

type SwitchRootProps = Omit<
  React.ComponentProps<typeof SwitchBase.Root>,
  'onCheckedChange' | 'render' | 'children' | 'className'
>;

export type BaseSwitchProps = {
  /**
   * Size of the switch component
   */
  size?: SelectorSize;
  /**
   * Custom styles to apply to the switch
   */
  styles?: string;
  /**
   * Custom content for the thumb of the switch
   */
  thumbChildren?: React.ReactNode;
  /**
   * Custom content for the track of the switch
   */
  trackChildren?: React.ReactNode;
  /**
   * Custom class name for the switch component
   */
  className?: string;
  /**
   * Whether the switch is checked or not
   */
  checked?: boolean;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Callback function when the switch state changes
   */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
} & SwitchRootProps;

/**
 * A Switch component that allows users to toggle between two states, such as on and off.
 * Typically used for settings or preferences, it provides immediate visual feedback.
 */
export function Switch({
  size = 'medium',
  className,
  styles,
  thumbChildren,
  trackChildren,
  onChange,
  ...props
}: BaseSwitchProps) {
  function handleCheckedChange(
    checked: boolean,
    eventDetails: { event: Event },
  ) {
    onChange?.(
      checked,
      eventDetails.event as unknown as ChangeEvent<HTMLInputElement>,
    );
  }

  return (
    <span
      className={clsx(
        switchStyles['container'],
        switchStyles[size],
        styles,
        className,
      )}
    >
      <SwitchBase.Root
        onCheckedChange={handleCheckedChange}
        render={(rootProps) => (
          <span
            {...rootProps}
            style={{ ...rootProps.style, display: 'contents' }}
          />
        )}
        {...props}
      >
        {trackChildren ?? <span className={switchStyles['track']} />}
        <SwitchBase.Thumb
          className={clsx({ [switchStyles['thumb']]: !thumbChildren })}
          render={
            thumbChildren
              ? (thumbProps) => (
                  <span
                    {...thumbProps}
                    style={{ ...thumbProps.style, display: 'contents' }}
                  />
                )
              : undefined
          }
        >
          {thumbChildren}
        </SwitchBase.Thumb>
      </SwitchBase.Root>
    </span>
  );
}

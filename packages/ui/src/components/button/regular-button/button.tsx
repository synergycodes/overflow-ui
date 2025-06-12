import clsx from 'clsx';
import variantStyles from '../styles/variant.module.css';
import borderRadiusStyles from '../styles/border-radius.module.css';
import gapStyles from '../styles/gap.module.css';

import { forwardRef, ReactElement } from 'react';
import { LabelButton, LabelButtonProps } from './label-button/label-button';
import {
  IconLabelButton,
  IconLabelButtonProps,
} from './icon-label-button/icon-label-button';
import { IconButton, IconButtonProps } from './icon-button/icon-button';
import {
  hasChildrenWithStringAndIcons,
  hasIconChildrenOnly,
  hasStringChildrenOnly,
} from '../guards';

type WithRef<T> = T & {
  ref?: React.Ref<HTMLButtonElement>;
};
/**
 * ButtonProps defines discriminated overloads for the Button component.
 *
 * Each variant — LabelButton, IconButton, and IconLabelButton — accepts a different
 * set of props. The component relies on **structural discrimination** (e.g. the presence
 * or absence of `children`, `icon`, etc.) rather than an explicit `type` field to determine
 * which variant is being used.
 *
 * This overload structure ensures that:
 * - Only valid prop combinations are allowed per variant.
 * - TypeScript can infer the correct overload based on how the component is used.
 * - Invalid prop combinations are caught at compile time.
 *
 * A union type would incorrectly allow mixing props from multiple variants,
 * so **overloads are required** to maintain strict type safety and a great developer experience.
 */

type ButtonProps = {
  (props: WithRef<LabelButtonProps>): ReactElement;
  (props: WithRef<IconButtonProps>): ReactElement;
  (props: WithRef<IconLabelButtonProps>): ReactElement;
};

const ButtonComponent = forwardRef<
  HTMLButtonElement,
  LabelButtonProps | IconButtonProps | IconLabelButtonProps
>(({ className, variant = 'primary', size = 'medium', ...props }, ref) => {
  const buttonProps = {
    ref,
    ...props,
    className: clsx(
      variantStyles[variant],
      borderRadiusStyles[size],
      gapStyles[size],
      className,
    ),
    variant,
    size,
  };

  if (hasStringChildrenOnly<LabelButtonProps>(props)) {
    return <LabelButton {...buttonProps}>{props.children}</LabelButton>;
  }

  if (hasIconChildrenOnly<IconButtonProps>(props)) {
    return <IconButton {...buttonProps}>{props.children}</IconButton>;
  }

  if (hasChildrenWithStringAndIcons<IconLabelButtonProps>(props)) {
    return <IconLabelButton {...buttonProps}>{props.children}</IconLabelButton>;
  }

  return null;
});

/**
 * We use a type assertion here to explicitly assign the overloads defined in ButtonProps.
 *
 * Although ButtonComponent uses runtime type guards to select the appropriate variant,
 * TypeScript cannot infer overloads from that implementation alone.
 *
 * This assertion ensures that the Button component:
 * - Exposes proper discriminated overloads to consumers
 * - Provides IntelliSense support
 * - Enforces prop correctness at the call site
 */
export const Button = ButtonComponent as ButtonProps;

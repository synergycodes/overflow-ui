import clsx from "clsx";

import variantStyles from "../styles/variant.module.css";
import borderRadiusStyles from "../styles/border-radius.module.css";
import fontSizeStyles from "../styles/font-size.module.css";
import iconSizeStyles from "../styles/icon-size.module.css";
import paddingStyles from "./padding.module.css";

import { Variant, BaseButtonProps } from "../types";
import { forwardRef } from "react";
import { BaseButton } from "../base-button/base-button";
import { Size } from "@ui/shared/types/size";

type IconNode = React.ReactNode;
type IconLabelButtonProps = {
  variant?: Variant;
  size?: Size;
  children: AllowedChildren;
};

type AllowedChildren =
  | [IconNode, string]
  | [string, IconNode]
  | [IconNode, string, IconNode];

/**
 * A flexible button component that allows only specific combinations of children:
 * - Icon followed by text.
 * - Text followed by an Icon.
 * - Icon, text and another Icon.
 *
 * Examples:
 * ```tsx
 * <IconLabelButton {...props} >
 *   <PlusCircle />
 *   Button
 * </IconLabelButton>
 *
 * <Button {...props} >
 *   Button
 *   <PlusCircle />
 * </Button>
 *
 * <Button {...props} >
 *   <PlusCircle />
 *   Button
 *   <PlusCircle />
 * </Button>
 * ```
 */
export const IconLabelButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps<IconLabelButtonProps>
>(({ size = "medium", variant = "primary", children, ...props }, ref) => (
  <BaseButton
    ref={ref}
    size={size}
    styles={clsx(
      variantStyles[variant],
      borderRadiusStyles[size],
      fontSizeStyles[size],
      iconSizeStyles[size],
      paddingStyles[size],
    )}
    {...props}
  >
    {children}
  </BaseButton>
));

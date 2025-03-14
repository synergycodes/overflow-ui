import clsx from "clsx";
import switchStyles from "./switch.module.css";
import "./variables.css";

import { Switch as SwitchBase, SwitchProps } from "@mui/base";
import { ItemSize } from "@ui/shared/types/item-size";
import { ChangeEvent } from "react";

export type BaseSwitchProps = {
  size?: ItemSize;
  styles?: string;
  thumbChildren?: React.ReactNode;
  trackChildren?: React.ReactNode;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<SwitchProps, "onChange">;

export function Switch({
  size = "small",
  className,
  styles,
  thumbChildren,
  trackChildren,
  onChange,
  ...props
}: BaseSwitchProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.checked, event);
  }

  const slotProps = {
    root: {
      className: clsx(
        switchStyles["container"],
        switchStyles[size],
        styles,
        className,
      ),
    },
    thumb: {
      className: clsx(thumbChildren ? "" : switchStyles["thumb"]),
      children: thumbChildren,
    },
    track: {
      className: clsx(trackChildren ? "" : switchStyles["track"]),
      children: trackChildren,
    },
    input: {
      className: switchStyles["input"],
    },
  };

  return (
    <SwitchBase slotProps={slotProps} onChange={handleChange} {...props} />
  );
}

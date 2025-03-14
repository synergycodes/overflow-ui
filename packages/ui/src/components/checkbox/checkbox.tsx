import clsx from "clsx";
import styles from "./checkbox.module.css";
import "./variables.css";

import { InputHTMLAttributes } from "react";
import { Check, Minus } from "@phosphor-icons/react";
import { ItemSize } from "@ui/shared/types/item-size";

const iconSizes = {
  small: 10,
  medium: 12,
  large: 14,
};

type Props = {
  size?: ItemSize;
  indeterminate?: boolean;
  checked?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export function Checkbox({
  size = "medium",
  className,
  indeterminate,
  checked,
  onChange,
  ...props
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
  }

  return (
    <label className={styles["wrapper"]}>
      <input
        type="checkbox"
        className={clsx(styles["checkbox"], styles[size], className)}
        onChange={handleChange}
        checked={checked}
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate ?? false;
          }
        }}
        {...props}
      />
      <span className={styles["icon"]}>
        {indeterminate ? (
          <Minus size={iconSizes[size]} weight="bold" />
        ) : (
          <Check size={iconSizes[size]} weight="bold" />
        )}
      </span>
    </label>
  );
}

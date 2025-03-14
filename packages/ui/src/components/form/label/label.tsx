import clsx from "clsx";
import styles from "./label.module.css";
import "../variables.css";

import { Asterisk } from "@phosphor-icons/react";
import { ItemSize } from "@ui/shared/types/item-size";

export type LabelProps = {
  label: string;
  required?: boolean;
  size?: ItemSize;
};

export function Label({ label, required, size = "medium" }: LabelProps) {
  return (
    <span className={clsx(styles["container"], styles[size])}>
      {required && <Asterisk />}
      <span className={styles["label"]}>{label}</span>
    </span>
  );
}

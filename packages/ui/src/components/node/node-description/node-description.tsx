import clsx from "clsx";
import styles from "./node-description.module.css";

type Props = {
  label: string;
  description?: string;
};

export function NodeDescription({ label, description }: Props) {
  return (
    <div className={styles["container"]}>
      <span className={clsx("h9", styles["title"])}>{label}</span>
      <span className={clsx("p11", styles["subtitle"])}>{description}</span>
    </div>
  );
}

import clsx from "clsx";
import styles from "./text-area.module.css";
import "./variables.css";

import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { ItemSize } from "../../shared/types/item-size";

export type TextAreaProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: ItemSize;
  maxRows?: number;
  minRows?: number;
  disabled?: boolean;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export function TextArea({
  value,
  defaultValue,
  placeholder,
  size = "medium",
  maxRows,
  minRows,
  disabled,
  error,
  onChange,
  className,
  ...props
}: TextAreaProps) {
  const containerClasses = clsx(
    styles[`container-${size}`],
    {
      "base--error": error,
      "base--disabled": disabled,
    },
    className,
  );

  const textareaClasses = clsx(styles[`text-area-${size}`]);

  return (
    <div className={containerClasses}>
      <TextareaAutosize
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        minRows={minRows}
        maxRows={maxRows}
        disabled={disabled}
        onChange={onChange}
        className={textareaClasses}
        {...props}
      />
    </div>
  );
}

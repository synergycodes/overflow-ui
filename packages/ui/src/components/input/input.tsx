import clsx from "clsx";
import inputStyles from "./input.module.css";
import inputRootStyles from "./input-root.module.css";
import inputFontStyles from "@ui/shared/styles/input-font-size.module.css";
import inputSizeStyles from "@ui/shared/styles/input-size.module.css";
import "./variables.css";

import { Input as InputBase } from "@mui/base";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { ClearButton } from "./clear-button/clear-button";
import { InputProps } from "./types";

export function Input({
  searchIcon,
  size = "medium",
  onClear,
  ...props
}: InputProps) {
  return (
    <InputBase
      startAdornment={searchIcon && <MagnifyingGlass weight="bold" />}
      endAdornment={onClear && <ClearButton onClick={onClear} />}
      slotProps={{
        root: {
          className: clsx(inputRootStyles["input-root"], inputSizeStyles[size]),
        },
        input: { className: clsx(inputStyles["input"], inputFontStyles[size]) },
      }}
      {...props}
    ></InputBase>
  );
}

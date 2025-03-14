import clsx from "clsx";
import selectButtonStyles from "./select-button/select-button.module.css";
import listBoxStyles from "@ui/shared/styles/list-box.module.css";
import style from "./select.module.css";
import "./variables.css";

import { Select as SelectBase } from "@mui/base/Select";
import { UseSelectParameters } from "@mui/base";
import { SelectValue } from "./select-value/select-value";
import { SelectButton } from "./select-button/select-button";
import { SelectOption } from "./select-option/select-option";
import { SelectItem } from "./types";
import { ItemSize } from "../../shared/types/item-size";
import { Separator } from "../separator/separator";

export type SelectBaseProps = UseSelectParameters<string | number | null> & {
  size?: ItemSize;
  placeholder?: string;
  items: SelectItem[];
};

export function Select({
  size = "medium",
  items,
  placeholder,
  ...props
}: SelectBaseProps) {
  const slotProps = {
    root: {
      className: clsx(
        selectButtonStyles["container"],
        selectButtonStyles[size],
      ),
    },
    listbox: { className: listBoxStyles["list-box"] },
    popup: {
      disablePortal: true,
      className: clsx(listBoxStyles["popup"], style["popup"]),
    },
  };

  return (
    <div className={style["container"]}>
      <SelectBase
        renderValue={(option) => (
          <SelectValue
            selectedOptionLabel={option}
            items={items}
            placeholder={placeholder}
          />
        )}
        slots={{ root: SelectButton }}
        slotProps={slotProps}
        {...props}
      >
        {items.map((item, index) =>
          item.type === "separator" ? (
            <Separator key={index} />
          ) : (
            <SelectOption key={item.value} {...item} size={size} />
          ),
        )}
      </SelectBase>
    </div>
  );
}

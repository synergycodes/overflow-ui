import { Size, SIZES } from "@axiom/ui";
import type { InputType } from "storybook/internal/types";
import { createSelect } from "./create-select";

export function createSizeInput(
  sizeOptions: readonly Size[] = SIZES,
): InputType {
  return createSelect(sizeOptions);
}

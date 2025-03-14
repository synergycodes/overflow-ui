import type { InputType } from "storybook/internal/types";

export function createSelect(options: readonly string[]): InputType {
  return {
    control: "select",
    options: options,
  };
}

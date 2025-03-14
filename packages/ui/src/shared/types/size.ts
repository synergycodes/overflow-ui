export const SIZES = [
  "xxxx-small",
  "xxx-small",
  "xx-small",
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
  "xx-large",
] as const;
export type Size = (typeof SIZES)[number];

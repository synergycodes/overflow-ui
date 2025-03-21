import { Config } from "./src/types";

export const config: Config = {
  primitives: ["numerals-mode-1", "primitives-mode-1"],
  themes: [
    {
      name: "tokens-dark",
      mediaQuery: "prefers-color-scheme: dark",
    },
    {
      name: "tokens-light",
      mediaQuery: "prefers-color-scheme: light",
    },
  ],
};

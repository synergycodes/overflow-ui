import { config } from "../config";
import { Theme } from "./types";
import { writeFile } from "node:fs/promises";
const { primitives, themes } = config;

const codeChunks: string[] = [];

export function generateCSSBundle() {
  for (const primitive of primitives) {
    codeChunks.push(createPrimitiveImport(primitive));
  }

  for (const theme of themes) {
    codeChunks.push(createThemeImport(theme));
  }

  const code = codeChunks.join("\n\n");

  return writeFile("./dist/axiom.css", code);
}

function createPrimitiveImport(name: string) {
  return `@import "./${name}.css";`;
}

function createThemeImport({ name, mediaQuery }: Theme) {
  return `@media (${mediaQuery}) {
  ${createPrimitiveImport(name)}
}`;
}

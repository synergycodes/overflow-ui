import tokenData from "../tokens.json";
import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary, { Config } from "style-dictionary";
import { toFileName } from "./to-file-name";
import { OUTPUT_DIR, TOKEN_OUTPUT_DIR } from "./constants";

register(StyleDictionary);

export async function tokensToCss() {
  const tokenSets = tokenData.$metadata.tokenSetOrder;

  for (const theme of tokenSets) {
    const themeName = toFileName(theme);

    const config = {
      source: [`${TOKEN_OUTPUT_DIR}${themeName}.json`],
      preprocessors: ["tokens-studio"],
      platforms: {
        css: {
          transformGroup: "tokens-studio",
          transforms: ["name/kebab"],
          buildPath: OUTPUT_DIR,
          files: [
            {
              destination: `${themeName}.css`,
              format: "css/variables",
              options: {
                outputReferences: true,
              },
            },
          ],
        },
      },
      log: logOptions,
    };

    const styleDictionary = new StyleDictionary(config as Config);

    await styleDictionary.buildAllPlatforms();
  }
}

const logOptions = {
  warnings: "disabled", // 'warn' | 'error' | 'disabled'
  verbosity: "verbose", // 'default' | 'silent' | 'verbose'
  errors: {
    brokenReferences: "console", // 'throw' | 'console'
  },
};

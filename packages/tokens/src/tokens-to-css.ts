import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary, { Config } from "style-dictionary";
import { toFileName } from "./to-file-name";
import { OUTPUT_DIR, TOKEN_OUTPUT_DIR } from "./constants";
import { config } from "../config";
const { primitives, themes } = config;

register(StyleDictionary);

export async function tokensToCss() {
  const tokenSets = [...primitives, ...themes.map(({ name }) => name)];

  for (const name of tokenSets) {
    const themeName = toFileName(name);

    const source = [...primitives, name].map(
      (tokenSet) => `${TOKEN_OUTPUT_DIR}${tokenSet}.json`,
    );

    const config = {
      source,
      preprocessors: ["tokens-studio"],
      platforms: {
        css: {
          transformGroup: "tokens-studio",
          transforms: ["name/kebab"],
          buildPath: OUTPUT_DIR,
          options: {
            outputReferences: true,
          },
          files: [
            {
              destination: `${themeName}.css`,
              format: "css/variables",
            },
          ],
        },
      },
      log: logOptions,
    };

    const styleDictionary = new StyleDictionary(config);

    await styleDictionary.buildAllPlatforms();
  }
}

const logOptions = {
  warnings: "disabled", // 'warn' | 'error' | 'disabled'
  verbosity: "verbose", // 'default' | 'silent' | 'verbose'
  errors: {
    brokenReferences: "console", // 'throw' | 'console'
  },
} satisfies Config["log"];

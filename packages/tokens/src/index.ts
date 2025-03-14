/* eslint-disable import/no-unresolved */
import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary);

const styleDictionary = new StyleDictionary({
  // make sure to have source match your token files!
  // be careful about accidentally matching your package.json or similar files that are not tokens
  source: ["tokens/**/*.json"],
  preprocessors: ["tokens-studio"], // <-- since 0.16.0 this must be explicit
  platforms: {
    css: {
      transformGroup: "tokens-studio", // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ["name/kebab"], // <-- add a token name transform for generating token names, default is camel
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
  },
});

async function main() {
  await styleDictionary.cleanAllPlatforms();
  await styleDictionary.buildAllPlatforms();
}

main();

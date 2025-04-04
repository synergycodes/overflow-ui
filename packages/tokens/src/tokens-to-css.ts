import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary, { Config } from 'style-dictionary';
import { toFileName } from './to-file-name';
import { OUTPUT_DIR, TOKEN_OUTPUT_DIR } from './constants';
import { config } from '../config';
const { primitives, themes } = config;

register(StyleDictionary);

export async function tokensToCss() {
  const primitiveSource = primitives.map(
    (tokenSet) => `${TOKEN_OUTPUT_DIR}${tokenSet}.json`,
  );

  for (const primitive of primitives) {
    const themeName = toFileName(primitive);

    const config = createSDConfig({ name: themeName, source: primitiveSource });

    const styleDictionary = new StyleDictionary(config);
    await styleDictionary.buildAllPlatforms();
  }

  for (const { name, selector } of themes) {
    const themeName = toFileName(name);

    const source = [...primitiveSource, `${TOKEN_OUTPUT_DIR}${name}.json`];

    const config = createSDConfig({ name: themeName, source, selector });

    const styleDictionary = new StyleDictionary(config);
    await styleDictionary.buildAllPlatforms();
  }
}

function createSDConfig({ name, selector, source }: SDConfigParams) {
  return {
    source,
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: OUTPUT_DIR,
        options: {
          outputReferences: true,
          selector,
        },
        files: [
          {
            destination: `${name}.css`,
            format: 'css/variables',
          },
        ],
      },
    },
    log: logOptions,
  };
}

type SDConfigParams = {
  name: string;
  source: string[];
  selector?: string;
};

const logOptions = {
  warnings: 'disabled', // 'warn' | 'error' | 'disabled'
  verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
  errors: {
    brokenReferences: 'console', // 'throw' | 'console'
  },
} satisfies Config['log'];

import { ejectTokens } from './eject-tokens';
import { generateCSSBundle } from './generate-css-bundle';
import { tokensToCss } from './tokens-to-css';

async function main() {
  ejectTokens();
  await tokensToCss();
  await generateCSSBundle();
}

main();

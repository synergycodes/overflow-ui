import { generateCSSVariables } from './generate-css-variables-docs';
import { generateDecisionLogList } from './generate-decision-log-listing';
import { generatePathTypes } from './generate-path-types';
import { generateTypeDocs } from './generate-type-docs';

export async function generateDocs() {
  await generatePathTypes();
  await generateCSSVariables();
  await generateTypeDocs();
  await generateDecisionLogList();
}

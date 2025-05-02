import { generateCSSVariables } from './generate-css-variables-docs';
import { generateDecisionLogList } from './generate-decision-log-listing';
import { generatePathTypes } from './generate-path-types';
import { generateTypeDocs } from './generate-type-docs';

export async function generateDocs() {
  const docsScripts = [
    generatePathTypes,
    generateCSSVariables,
    generateTypeDocs,
    generateDecisionLogList,
  ];

  for (const script of docsScripts) {
    await script();
  }
}

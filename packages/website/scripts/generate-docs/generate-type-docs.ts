import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const docgenCommand =
  'react-docgen "../ui/src/components/**/*.tsx" --pretty -o "./generated/props.json"';

export async function generateTypeDocs() {
  return promisify(exec)(docgenCommand);
}

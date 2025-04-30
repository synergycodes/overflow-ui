import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { readJson, toPrettyJson } from '../json-utils';

const OUTPUT_FILE = join(cwd(), 'generated', 'props.json');
const DOCGEN_COMMAND =
  'react-docgen "../ui/src/components/**/*.tsx" --pretty -o "./generated/props.json"';

export async function generateTypeDocs() {
  await promisify(exec)(DOCGEN_COMMAND);

  const propsObject = readJson(OUTPUT_FILE);

  writeFile(OUTPUT_FILE, toPrettyJson(propsObject));
}

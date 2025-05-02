import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { readJson, toPrettyJson } from '../utils/json';
import { createScript } from '../utils/create-script';

const OUTPUT_FILE = join(cwd(), 'generated', 'props.json');
const DOCGEN_COMMAND =
  'react-docgen "../ui/src/components/**/*.tsx" -o "./generated/props.json"';

export const generateTypeDocs = createScript(
  'Props Type Docs',
  async function () {
    await promisify(exec)(DOCGEN_COMMAND);

    const propsObject = await readJson(OUTPUT_FILE);

    await writeFile(OUTPUT_FILE, toPrettyJson(propsObject));
  },
);

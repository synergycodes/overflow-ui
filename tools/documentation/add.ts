import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { kebabToPascalCase } from './utils/text';
import { useTemplate } from './utils/template';

// Create readline interface for console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// Ask user for component path
rl.question(
  'Enter component path (e.g., switch or packages/ui/src/components/switch): ',
  (componentInput) => {
    const componentPath = componentInput.startsWith(
      'packages/ui/src/components/',
    )
      ? componentInput
      : `packages/ui/src/components/${componentInput}`;
    // const baseDocsDir = path.resolve(__dirname, '../packages/website/docs/components');
    const componentFileName = path.basename(componentPath);
    const componentDocDir = path.resolve(
      __dirname,
      `../../packages/website/docs/components/${componentFileName}`,
    );

    const isAlreadyAdded = fs.existsSync(componentDocDir);
    if (isAlreadyAdded) {
      console.log(' ');
      console.log(`${componentDocDir} already exists.`);
      console.log('Update it or remove the directory to regenerate.');

      // return;
    }

    console.log(`Creating dir: ${componentDocDir}`);
    console.log(componentDocDir);

    // fs.mkdirSync(componentDocDir);

    const templatesDir = path.resolve(__dirname, './templates/');
    const tsxContent = useTemplate(
      fs.readFileSync(path.join(templatesDir, 'tsx.txt'), 'utf-8'),
      {
        componentFileName,
      },
    );

    // File paths
    const tsxPath = path.join(componentDocDir, `${componentFileName}.tsx`);
    const txtPath = path.join(componentDocDir, `${componentFileName}.txt`);

    // Create files with placeholder content
    fs.writeFileSync(tsxPath, tsxContent);
    fs.writeFileSync(txtPath, `${componentFileName} notes or metadata.`);

    console.log(`Created files:\n- ${tsxPath}\n- ${txtPath}`);
    rl.close();
  },
);

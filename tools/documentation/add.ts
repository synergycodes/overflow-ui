import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { useTemplate } from './utils/template';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Enter component path (e.g., switch or packages/ui/src/components/switch): ',
  (componentInput) => {
    const componentPath = componentInput.startsWith(
      'packages/ui/src/components/',
    )
      ? componentInput
      : `packages/ui/src/components/${componentInput}`;
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
    } else {
      fs.mkdirSync(componentDocDir);
    }

    console.log(`Creating dir: ${componentDocDir}`);

    const templatesDir = path.resolve(__dirname, './templates/');
    const tsxContent = useTemplate(
      fs.readFileSync(path.join(templatesDir, 'tsx.txt'), 'utf-8'),
      {
        componentFileName,
      },
    );
    const jsxContent = useTemplate(
      fs.readFileSync(path.join(templatesDir, 'jsx.txt'), 'utf-8'),
      {
        componentFileName,
      },
    );
    const mdxContent = useTemplate(
      fs.readFileSync(path.join(templatesDir, 'mdx.txt'), 'utf-8'),
      {
        componentFileName,
      },
    );

    const tsxPath = path.join(componentDocDir, `${componentFileName}-docs.tsx`);
    const jsxPath = path.join(
      componentDocDir,
      `${componentFileName}.example.jsx`,
    );
    const mdxPath = path.join(componentDocDir, `${componentFileName}.mdx`);

    fs.writeFileSync(tsxPath, tsxContent);
    fs.writeFileSync(jsxPath, jsxContent);
    fs.writeFileSync(mdxPath, mdxContent);

    console.log(`Created files:\n- ${tsxPath}\n- ${jsxPath}\n- ${mdxPath}`);
    
    console.log(' ');
    console.log('Update props in those files.');

    console.log('To run Docusaurus run: pnpm -F website dev');
    console.log('To update comments run: pnpm -F website prepare');

    rl.close();
  },
);

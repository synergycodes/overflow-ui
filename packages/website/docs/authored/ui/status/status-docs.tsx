import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/status.example.tsx';

export function StatusDocs() {
  return (
    <ComponentPage
      // TODO: Check that the correct .css files are picked
      cssPaths={['components/status/status.module.css']}
      componentPath="components/status/status.tsx"
      exampleCode={exampleCode}
    />
  );
}

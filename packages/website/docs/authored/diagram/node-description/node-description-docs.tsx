import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/node-description.example.tsx';

export function Docs() {
  return (
    <ComponentPage
      cssPaths={[
        'components/node/node-description/node-description.module.css',
      ]}
      componentPath="components/node/node-description/node-description.tsx"
      exampleCode={exampleCode}
    />
  );
}

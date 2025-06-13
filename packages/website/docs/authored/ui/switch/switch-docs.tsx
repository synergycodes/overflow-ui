import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/switch.example.tsx';

export function SwitchDocs() {
  return (
    <ComponentPage
      cssPaths={['components/switch/switch.module.css']}
      componentPath="components/switch/switch.tsx"
      exampleCode={exampleCode}
    />
  );
}

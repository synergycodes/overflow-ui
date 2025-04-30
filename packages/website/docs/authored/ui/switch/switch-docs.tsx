import { Switch } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./switch.example.jsx';

export function SwitchDocs() {
  return (
    <ComponentPage
      preview={<Switch />}
      cssPaths={['components/switch/switch.module.css']}
      componentPath="components/switch/switch.tsx"
      exampleCode={exampleCode}
    />
  );
}

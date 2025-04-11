import { Switch } from '@axiom/ui';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./switch.example.jsx';

export function SwitchDocs() {
  return (
    <ComponentPage
      preview={
        <Switch
            // TODO: add props
        />
      }
      cssPath="components/switch/switch.module.css"
      componentPath="components/switch/switch.tsx"
      exampleCode={exampleCode}
    />
  );
}

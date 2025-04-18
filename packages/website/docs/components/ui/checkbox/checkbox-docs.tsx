import { Checkbox } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./checkbox.example.jsx';

export function CheckboxDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Checkbox size="small" />
          <Checkbox size="medium" />
          <Checkbox size="extra-small" />
          <Checkbox indeterminate />
          <Checkbox disabled />
          <Checkbox disabled checked />
          <Checkbox disabled indeterminate />
        </div>
      }
      cssPaths={['components/checkbox/checkbox.module.css']}
      componentPath="components/checkbox/checkbox.tsx"
      exampleCode={exampleCode}
    />
  );
}

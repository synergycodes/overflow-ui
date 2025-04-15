import { Separator } from '@axiom/ui';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./separator.example.jsx';

export function SeparatorDocs() {
  return (
    <ComponentPage
      preview={
        <div>
          <h1 style={{ width: 'max-content' }}>Section 1</h1>
          <Separator />
          <h1 style={{ width: 'max-content' }}>Section 2</h1>
        </div>
      }
      cssPath="components/separator/separator.module.css"
      componentPath="components/separator/separator.tsx"
      exampleCode={exampleCode}
    />
  );
}

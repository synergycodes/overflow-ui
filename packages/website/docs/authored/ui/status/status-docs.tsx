import { Status } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./status.example.jsx';

export function StatusDocs() {
  return (
    <ComponentPage
      preview={
        <div
          style={{
            position: 'relative',
            border: '1px solid #ddd',
            width: '100px',
            padding: '15px',
            textAlign: 'center',
            borderRadius: '15px',
          }}
        >
          <Status status="invalid" />
          Example
        </div>
      }
      // TODO: Check that the correct .css files are picked
      cssPaths={['components/status/status.module.css']}
      componentPath="components/status/status.tsx"
      exampleCode={exampleCode}
    />
  );
}

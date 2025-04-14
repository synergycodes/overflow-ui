import { TextArea } from '@axiom/ui';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./text-area.example.jsx';

export function TextAreaDocs() {
  return (
    <ComponentPage
      preview={
        <TextArea
          size="medium"
          placeholder="Placeholder text"
          defaultValue=""
        />
      }
      cssPath="components/text-area/text-area.module.css"
      componentPath="components/text-area/text-area.tsx"
      exampleCode={exampleCode}
    />
  );
}

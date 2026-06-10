import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/date-picker.example.tsx';

export function DatePickerDocs() {
  return (
    <ComponentPage
      cssPaths={['components/date-picker/date-picker.module.css']}
      componentPath="components/date-picker/date-picker.tsx"
      exampleCode={exampleCode}
    />
  );
}

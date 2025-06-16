import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/snackbar.example.tsx';

export function SnackbarDocs() {
  return (
    <ComponentPage
      cssPaths={['components/snackbar/snackbar.module.css']}
      componentPath="components/snackbar/snackbar.tsx"
      exampleCode={exampleCode}
    />
  );
}

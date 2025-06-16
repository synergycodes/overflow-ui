import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/avatar.example.tsx';

export function AvatarDocs() {
  return (
    <ComponentPage
      cssPaths={['components/avatar/avatar.module.css']}
      componentPath="components/avatar/avatar.tsx"
      exampleCode={exampleCode}
    />
  );
}

import { ComponentNamePascalCase } from '@axiom/ui';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./avatar.example.jsx';

export function AvatarDocs() {
  return (
    <ComponentNamePascalCase
      preview={
        <Avatar
            // TODO: add props
        />
      }
      cssPath="components/ComponentNameLowerCase/ComponentNameLowerCase.module.css"
      componentPath="components/ComponentNameLowerCase/ComponentNameLowerCase.tsx"
      exampleCode={exampleCode}
    />
  );
}

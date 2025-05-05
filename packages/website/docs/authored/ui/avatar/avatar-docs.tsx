import { Avatar } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/avatar.example.tsx';

export function AvatarDocs() {
  return (
    <ComponentPage
      preview={
        <Avatar
          imageUrl="https://picsum.photos/id/237/200/300"
          username="Puppy"
          size="extra-large"
        />
      }
      cssPaths={['components/avatar/avatar.module.css']}
      componentPath="components/avatar/avatar.tsx"
      exampleCode={exampleCode}
    />
  );
}

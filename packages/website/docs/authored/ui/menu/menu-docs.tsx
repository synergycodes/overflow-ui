import { Menu, LabelButton } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/menu.example.tsx';

export function MenuDocs() {
  return (
    <ComponentPage
      preview={
        <Menu items={[{ label: 'Star Wars' }, { label: 'Star Trek' }]}>
          <LabelButton label="Open" />
        </Menu>
      }
      componentPath="components/menu/menu.tsx"
      exampleCode={exampleCode}
    />
  );
}

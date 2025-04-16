import { Menu, LabelButton } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./menu.example.jsx';

export function MenuDocs() {
  return (
    <ComponentPage
      preview={
        <Menu items={[{ label: 'Star Wars' }, { label: 'Star Treck' }]}>
          <LabelButton label="Open" />
        </Menu>
      }
      componentPath="components/menu/menu.tsx"
      exampleCode={exampleCode}
    />
  );
}

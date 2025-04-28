import { Select } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./select.example.tsx';

export function SelectDocs() {
  return (
    <ComponentPage
      preview={
        <Select
          items={[
            { label: 'Chair', value: 'chair' },
            { label: 'Table', value: 'table' },
            { label: 'Sofa', value: 'sofa' },
            { label: 'Bookshelf', value: 'bookshelf' },
            { label: 'Wardrobe', value: 'wardrobe' },
            { type: 'separator' },
            { label: 'Other', value: 'other' },
          ]}
          placeholder="Pick"
        />
      }
      cssPaths={['components/select/select-button/select-button.module.css']}
      componentPath="components/select/select.tsx"
      exampleCode={exampleCode}
    />
  );
}

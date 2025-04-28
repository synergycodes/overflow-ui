import { Checkbox } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./checkbox.example.jsx';
import { useState } from 'react';

export function CheckboxDocs() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Checkbox size="extra-small" />
          <Checkbox size="small" />
          <Checkbox size="medium" />
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange}
          />
          <Checkbox disabled />
          <Checkbox disabled checked />
          <Checkbox disabled indeterminate />
        </div>
      }
      cssPaths={['components/checkbox/checkbox.module.css']}
      componentPath="components/checkbox/checkbox.tsx"
      exampleCode={exampleCode}
    />
  );
}

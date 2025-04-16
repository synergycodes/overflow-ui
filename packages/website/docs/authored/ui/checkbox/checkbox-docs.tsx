import { Checkbox } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./checkbox.example.jsx';
import { useState, ChangeEvent } from 'react';

export function CheckboxDocs() {
  const [{ shouldShownIndeterminate, checked }, setIndeterminateState] =
    useState<{
      shouldShownIndeterminate: boolean;
      checked: boolean;
    }>({
      shouldShownIndeterminate: true,
      checked: false,
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIndeterminateState({
      shouldShownIndeterminate: false,
      checked: event.target.checked,
    });
  };

  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Checkbox size="extra-small" />
          <Checkbox size="small" />
          <Checkbox size="medium" />
          <Checkbox
            checked={!shouldShownIndeterminate && checked}
            indeterminate={shouldShownIndeterminate}
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

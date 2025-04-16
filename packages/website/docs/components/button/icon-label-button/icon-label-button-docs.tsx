import React from 'react';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./icon-label-button.example.jsx';
import { IconLabelButton } from '@synergycodes/axiom';
import { Check, Plus, User } from '@phosphor-icons/react';

export function IconLabelButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <IconLabelButton
            variant="primary"
            children={[<Check size={20} />, 'With Icon']}
            key={1}
            style={{ width: 'max-content' }}
          />
          <IconLabelButton
            variant="secondary"
            children={[<Plus size={20} />, 'Add Item']}
            key={2}
            style={{ width: 'max-content' }}
          />
          <IconLabelButton
            variant="gray"
            children={[<User size={20} />, 'Profile']}
            key={3}
            style={{ width: 'max-content' }}
          />
        </div>
      }
      cssPaths={['components/button/base-button/base-button.module.css']}
      componentPath="components/button/icon-label-button/icon-label-button.tsx"
      exampleCode={exampleCode}
    />
  );
}

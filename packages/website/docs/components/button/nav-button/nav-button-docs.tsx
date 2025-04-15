import React from 'react';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./nav-button.example.jsx';
import { NavButton } from '@axiom/ui';
import { Check, Plus, User } from '@phosphor-icons/react';

export function NavButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <NavButton icon={<Check size={20} key={1} />} />
          <NavButton icon={<Plus size={20} key={2} />} />
          <NavButton icon={<User size={20} key={3} />} />
        </div>
      }
      cssPath="components/button/base-button/base-button.module.css"
      componentPath="components/button/nav-button/nav-button.tsx"
      exampleCode={exampleCode}
    />
  );
}

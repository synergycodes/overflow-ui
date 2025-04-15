import React from 'react';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./icon-button.example.jsx';
import { IconButton } from '@axiom/ui';
import { Check, Plus, User } from '@phosphor-icons/react';

export function IconButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <IconButton Icon={Check} variant="primary" key={1} />
          <IconButton Icon={Plus} variant="secondary" key={2} />
          <IconButton Icon={User} variant="gray" key={3} />
        </div>
      }
      cssPath="components/button/base-button/base-button.module.css"
      componentPath="components/button/icon-button/icon-button.tsx"
      exampleCode={exampleCode}
    />
  );
}

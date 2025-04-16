import React from 'react';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./label-button.example.jsx';
import { LabelButton } from '@synergycodes/axiom';

export function LabelButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <LabelButton
            label="Primary Button"
            variant="primary"
            key={1}
            style={{ width: 'max-content' }}
          />
          <LabelButton
            label="Secondary Button"
            variant="secondary"
            key={2}
            style={{ width: 'max-content' }}
          />
          <LabelButton
            label="Gray Button"
            variant="gray"
            key={3}
            style={{ width: 'max-content' }}
          />
          <LabelButton
            label="Error Button"
            variant="error"
            key={4}
            style={{ width: 'max-content' }}
          />
          <LabelButton
            label="Warning Button"
            variant="warning"
            key={5}
            style={{ width: 'max-content' }}
          />
          <LabelButton
            label="Success Button"
            variant="success"
            key={6}
            style={{ width: 'max-content' }}
          />
          <LabelButton
            label="Ghost Destructive"
            variant="ghost-destructive"
            key={7}
            style={{ width: 'max-content' }}
          />
          <LabelButton
            label="Loading"
            variant="primary"
            isLoading={true}
            key={8}
            style={{ width: 'max-content' }}
          />
        </div>
      }
      cssPaths={['components/button/base-button/base-button.module.css']}
      componentPath="components/button/label-button/label-button.tsx"
      exampleCode={exampleCode}
    />
  );
}

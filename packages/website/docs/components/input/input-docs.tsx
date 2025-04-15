import { Input } from '@axiom/ui';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./input.example.jsx';
import React from 'react';

export function InputDocs() {
  const [value, setValue] = React.useState<string>('Hello World');
  return (
    <ComponentPage
      preview={
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ minWidth: '150px' }}
        />
      }
      cssPath="components/avatar/avatar.module.css"
      componentPath="components/input/input.tsx"
      exampleCode={exampleCode}
    />
  );
}

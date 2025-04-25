import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./input.example.jsx';
import React from 'react';
import { InputPreview } from './input-preview/input-preview';

export function InputDocs() {
  return (
    <ComponentPage
      preview={<InputPreview />}
      componentPath="components/input/input.tsx"
      exampleCode={exampleCode}
    />
  );
}

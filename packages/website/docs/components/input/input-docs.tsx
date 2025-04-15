import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./input.example.jsx';
import React from 'react';
import { Preview } from './preview/preview';

export function InputDocs() {
  return (
    <ComponentPage
      preview={<Preview />}
      cssPath="components/input/input.module.css"
      componentPath="components/input/input.tsx"
      exampleCode={exampleCode}
    />
  );
}

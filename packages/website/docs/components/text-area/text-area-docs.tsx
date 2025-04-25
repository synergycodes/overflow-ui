import { TextArea } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./text-area.example.tsx';
import classes from './text-area.module.css';

export function TextAreaDocs() {
  return (
    <ComponentPage
      preview={
        <TextArea
          size="medium"
          placeholder="Placeholder text"
          defaultValue=""
          className={classes['text-area']}
        />
      }
      cssPaths={['components/text-area/text-area.module.css']}
      componentPath="components/text-area/text-area.tsx"
      exampleCode={exampleCode}
    />
  );
}

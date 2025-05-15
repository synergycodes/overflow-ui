import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/character-counter.example.tsx';
import { CharacterCounterPreview } from './character-counter-preview/character-counter-preview';

export function CharacterCounterDocs() {
  return (
    <ComponentPage
      preview={<CharacterCounterPreview />}
      componentPath="components/character-counter/character-counter.tsx"
      exampleCode={exampleCode}
    />
  );
}

import CodeBlock from '@theme/CodeBlock';
import ShadowDomWrapper from '../shadow-dom-wrapper/shadow-dom-wrapper';
import { useMemo } from 'react';

type Props = {
  exampleCode?: string;
};

export function Playground({ exampleCode }: Props) {
  const exampleCodeWithoutImports = useMemo(() => {
    const exampleCodeChunks = exampleCode.split('export');

    if (exampleCodeChunks.length > 2) {
      return `
        // The word 'export' is a magical keyword needed for our snippet to work in Docusaurus Playground.
        // It separates imports from example code.
        // Use it once in your example.tsx file.
        // 
        // For more information about preview debugging, check packages/website/tools/README.md
      `;
    }

    if (exampleCode.length > 1) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_imports, ...code] = exampleCodeChunks;

      return code.join('export').trim();
    }

    return exampleCode.trim();
  }, [exampleCode]);

  return (
    <>
      <ShadowDomWrapper>
        <CodeBlock live language="tsx">
          {exampleCodeWithoutImports}
        </CodeBlock>
      </ShadowDomWrapper>
    </>
  );
}

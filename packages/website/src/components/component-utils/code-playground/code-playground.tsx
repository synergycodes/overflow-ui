import CodeBlock from '@theme/CodeBlock';
import ShadowDomWrapper from '../shadow-dom-wrapper/shadow-dom-wrapper';

type Props = {
  exampleCode?: string;
};

export function Playground({ exampleCode }: Props) {
  const exampleCodeWithoutImports = exampleCode.split('export').at(-1).trim();

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

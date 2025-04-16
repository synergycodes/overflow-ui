import CodeBlock from '@theme/CodeBlock';
import ShadowDomWrapper from '../shadow-dom-wrapper/shadow-dom-wrapper';

type Props = {
  exampleCode?: string;
};

export function Playground({ exampleCode }: Props) {
  return (
    <>
      <ShadowDomWrapper>
        <CodeBlock live language="tsx">
          {exampleCode}
        </CodeBlock>
      </ShadowDomWrapper>
    </>
  );
}

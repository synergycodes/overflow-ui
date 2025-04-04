import CodeBlock from '@theme/CodeBlock';

type Props = {
  exampleCode?: string;
};

export function Playground({ exampleCode }: Props) {
  return (
    <CodeBlock live language="tsx">
      {exampleCode}
    </CodeBlock>
  );
}

import { HighlightedCode, Pre } from 'codehike/code';

export function Code({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <div>
      <Pre
        code={codeblock}
        style={{ background: '#212121', color: '#fafafa' }}
      />
    </div>
  );
}

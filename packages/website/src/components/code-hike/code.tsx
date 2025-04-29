import { HighlightedCode, Pre } from 'codehike/code';
import { testx } from './x';

testx.a = '123';

export function Code({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <div>
      <Pre
        code={codeblock}
        style={{
          background: '#212121',
          borderWidth: testx.a,
          color: '#fafafa',
        }}
      />
    </div>
  );
}

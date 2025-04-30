import { HighlightedCode, Pre } from 'codehike/code';
import styles from './code.module.css';

export function Code({ codeblock }: { codeblock: HighlightedCode }) {
  return <Pre code={codeblock} className={styles['code']} />;
}

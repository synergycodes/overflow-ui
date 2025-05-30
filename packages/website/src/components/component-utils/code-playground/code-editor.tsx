import { themes } from 'prism-react-renderer';
import { LiveEditor } from 'react-live';
import styles from './code-playground.module.css';
import { Prism } from './prism';

type Props = {
  language?: string;
  onChange: (code: string) => void;
};

export function CodeEditor({ language = 'tsx', onChange }: Props) {
  return (
    <LiveEditor
      className={styles['editor']}
      theme={themes.duotoneDark}
      language={language}
      onChange={onChange}
      prism={Prism}
    />
  );
}

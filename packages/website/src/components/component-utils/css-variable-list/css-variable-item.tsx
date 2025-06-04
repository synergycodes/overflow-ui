import styles from './css-variable-list.module.css';
import { PUBLIC_VARIABLE_PREFIX } from './css-variable-types';

type Props = {
  name: string;
};

export function CSSVariableItem({ name }: Props) {
  const [, variableName] = splitName(name);

  return (
    <div className={styles['variable-item']}>
      <span>
        <span className={styles['prefix']}>{PUBLIC_VARIABLE_PREFIX}</span>
        <span className={styles['name']}>{variableName}</span>
      </span>
    </div>
  );
}

function splitName(name: string): string[] {
  return name.split(PUBLIC_VARIABLE_PREFIX);
}

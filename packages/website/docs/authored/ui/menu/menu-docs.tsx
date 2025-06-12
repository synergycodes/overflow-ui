import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/menu.example.tsx';

import styles from './menu-docs.module.css';

export function MenuDocs() {
  return (
    <ComponentPage
      componentPath="components/menu/menu.tsx"
      exampleCode={exampleCode}
      className={styles['menu-docs']}
    />
  );
}

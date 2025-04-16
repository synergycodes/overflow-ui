import type { Documentation } from 'react-docgen';
import data from '../../../generated/props.json';
import { getUISourcePath } from './get-ui-source-path';

/**
 * @param path Relative path starting from packages/ui/src/
 */
export function getAPIData(path: string) {
  const componentData = data[getUISourcePath(path)];

  if (!componentData) {
    return { props: {} };
  }

  const [firstComponent] = componentData as Documentation[];
  return firstComponent || { props: {} };
}

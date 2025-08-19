import { OverflowUITSXRelativePath } from '@site/generated/path-types';
import { getAPIData } from '../get-api-data';

type Props = {
  path?: OverflowUITSXRelativePath;
  hardcodedDescription?: string;
};

export function Description({ path, hardcodedDescription }: Props) {
  const { description } = path
    ? getAPIData(path)
    : { description: hardcodedDescription };

  if (!description) {
    return null;
  }

  return <p>{description}</p>;
}

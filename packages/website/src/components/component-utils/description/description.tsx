import { AxiomTSXRelativePath } from '@site/generated/path-types';
import { getAPIData } from '../get-api-data';

type Props = {
  path: AxiomTSXRelativePath;
};

export function Description({ path }: Props) {
  const { description } = getAPIData(path);

  return <p>{description}</p>;
}

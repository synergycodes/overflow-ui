import { kebabToPascalCase } from './text';

export const useTemplate = (
  template: string,
  { componentFileName }: { componentFileName: string },
) => {
  const componentKebabName = componentFileName;
  const componentPascalName = kebabToPascalCase(componentFileName);

  return template
    .replaceAll('ComponentKebabName', componentKebabName)
    .replaceAll('componentPascalName', componentPascalName);
};

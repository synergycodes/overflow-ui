export function getUISourcePath(relativePath?: string) {
  return `../ui/src/${relativePath ?? ''}`;
}

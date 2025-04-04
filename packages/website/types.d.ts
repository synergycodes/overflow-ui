declare module '@theme/CodeBlock' {
  interface Props {
    live?: boolean;
  }
}

declare module '!!raw-loader*' {
  export default '';
}

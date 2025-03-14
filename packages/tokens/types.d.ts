declare module "@tokens-studio/sd-transforms" {
  export function register(styleDictionary: unknown): void;
}

declare module "style-dictionary" {
  class StyleDictionary {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(args: any): StyleDictionary;

    async cleanAllPlatforms(): Promise<void> {}

    async buildAllPlatforms(): Promise<void> {}
  }

  export default StyleDictionary;
}

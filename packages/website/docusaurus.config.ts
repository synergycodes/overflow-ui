import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from 'codehike/mdx';

const codeHikeConfig: CodeHikeConfig = {
  components: { code: 'Code' },
  syntaxHighlighting: {
    theme: 'material-palenight',
  },
};

const config = {
  title: 'Overflow UI',
  tagline: 'UI Components + Diagramming',
  favicon: 'img/favicon.ico',

  url: 'https://synergycodes.github.io',
  baseUrl: '/ui-components',

  organizationName: 'Synergy Codes',
  projectName: 'overflow-ui',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: './src/css/custom.css',
        },
        docs: {
          beforeDefaultRemarkPlugins: [[remarkCodeHike, codeHikeConfig]],
          recmaPlugins: [[recmaCodeHike, codeHikeConfig]],
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        googleTagManager: {
          containerId: 'GTM-P4WNHP8N',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    image: 'img/logo-dark.svg',
    navbar: {
      logo: {
        alt: 'Overflow UI',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        href: 'https://overflow.dev',
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          label: 'Overflow',
          to: 'https://www.overflow.dev/',
        },
        {
          label: 'Github',
          to: 'https://github.com/synergycodes/overflow-ui',
        },
        {
          label: 'YouTube',
          to: 'https://www.youtube.com/@synergycodes/videos',
        },
      ],
      copyright: `© Synergy Codes ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.nightOwlLight,
      darkTheme: prismThemes.nightOwl,
    },
  } satisfies Preset.ThemeConfig,
  themes: [
    '@docusaurus/theme-live-codeblock',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        indexBlog: false,
        indexDocs: true,
        docsRouteBasePath: '/',
        hashed: true,
      },
    ],
  ],
  plugins: [
    './plugins/shadow-dom-css/postcss.ts',
    './plugins/doc-extract-plugin/doc-extract-plugin.ts',
    ...[
      process.env.NODE_ENV === 'production' && '@docusaurus/plugin-debug',
    ].filter(Boolean),
  ],
} satisfies Config;

export default config;
export type OverflowUIDocsConfig = typeof config;

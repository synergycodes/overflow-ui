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

// Options

const config = {
  title: 'Axiom',
  tagline: 'UI Components + Diagramming',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://synergycodes.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ui-components',

  organizationName: 'Synergy Codes',
  projectName: 'axiom',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          beforeDefaultRemarkPlugins: [[remarkCodeHike, codeHikeConfig]],
          recmaPlugins: [[recmaCodeHike, codeHikeConfig]],
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/synergycodes/axiom/tree/main/packages/create-docusaurus/templates/shared/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
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
        alt: 'Axiom',
        src: 'img/logo-light.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Synergy Codes',
          items: [
            {
              label: 'Synergy Codes',
              to: 'https://synergycodes.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Synergy Codes`,
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
export type AxiomDocsConfig = typeof config;

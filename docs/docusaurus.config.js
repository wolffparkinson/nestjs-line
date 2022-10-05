// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NestJS LINE',
  tagline: 'Collection of NestJS modules for building LINE bots',
  url: 'https://wolffparkinson.github.io',
  baseUrl: '/nestjs-line/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wolffparkinson',
  projectName: 'wolffparkinson.github.io',
  trailingSlash: false,
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: process.env.NODE_ENV !== 'production',
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/wolffparkinson/nestjs-line/blob/main/apps/docs/messaging',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]]
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/contributing/**']
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        content:
          '⭐️ If you like NestJS LINE, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/wolffparkinson/nestjs-line">GitHub</a>! ⭐️'
      },
      metadata: [
        {
          name: 'keywords',
          content: 'line, line-bot, framework, nestjs-line, github, open-source'
        },
        { hid: 'og:site_name', property: 'og:site_name', content: 'NestJS LINE' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
      ],
      navbar: {
        title: 'NestJS LINE',
        logo: {
          alt: 'NestJS LINE Logo',
          src: 'img/favicon.ico',
        },
        items: [
          {
            type: 'doc',
            docId: 'messaging',
            position: 'left',
            label: 'Messaging',
          },
          {
            href: 'https://www.npmjs.com/package/@nestjs-line/messaging',
            position: 'right',
            className: 'header-npm-link',
            'aria-label': 'NPM'
          },
          {
            href: 'https://github.com/wolffparkinson/nestjs-line',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository'
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Messaging',
                to: '/docs/messaging',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/nestjs-line',
              // },
              {
                label: 'Discord',
                href: 'https://discord.gg/vn7ctHe23q',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/wolffparkinson/nestjs-line',
              },
              {
                label: 'Necord',
                href: 'https://github.com/necordjs/necord',
              },
            ],
          },
        ],
        copyright: `Copyright © 2022 - ${new Date().getFullYear()} • Built by <a target="_blank" href="https://github.com/wolffparkinson">WolffParkinson</a> and <a target="_blank" href="https://github.com/wolffparkinson/nestjs-line/graphs/contributors">Others</a> with 💖`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

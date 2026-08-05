import { defineConfig } from 'vitepress'

const domain = 'https://beastofreincarnation.gg'

export default defineConfig({
  title: 'Beast of Reincarnation Guide',
  description: 'Fast, verified answers for Beast of Reincarnation players.',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: domain },
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#d4ff5c' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Beast of Reincarnation Guide' }]
  ],
  themeConfig: {
    logo: { src: '/mark.svg', alt: 'BOR Guide' },
    search: { provider: 'local', options: { locales: { ja: { translations: { button: { buttonText: '検索', buttonAriaLabel: '検索' }, modal: { noResultsText: '結果がありません', resetButtonTitle: '検索をリセット', footer: { selectText: '選択', navigateText: '移動', closeText: '閉じる' } } } } } } },
    socialLinks: [],
    footer: { message: 'Unofficial fan guide. Not affiliated with or endorsed by GAME FREAK, Fictions, or platform holders.', copyright: '© 2026 beastofreincarnation.gg' }
  },
  locales: {
    root: { label: 'English', lang: 'en', link: '/en/', themeConfig: { nav: navEn(), sidebar: sidebarEn(), outline: { label: 'On this page' }, docFooter: { prev: 'Previous', next: 'Next' } } },
    ja: { label: '日本語', lang: 'ja', link: '/ja/', themeConfig: { nav: navJa(), sidebar: sidebarJa(), outline: { label: 'このページの内容' }, lastUpdated: { text: '最終更新' }, docFooter: { prev: '前へ', next: '次へ' }, footer: { message: '非公式ファン攻略サイトです。GAME FREAK、Fictions、各プラットフォームとは関係なく、公認も受けていません。', copyright: '© 2026 beastofreincarnation.gg' } } }
  },
  transformHead({ pageData }) {
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const canonical = `${domain}/${path}`
    const alternate = path.startsWith('ja/') ? path.replace(/^ja\//, 'en/') : path.replace(/^en\//, 'ja/')
    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['link', { rel: 'alternate', hreflang: path.startsWith('ja/') ? 'ja' : 'en', href: canonical }],
      ['link', { rel: 'alternate', hreflang: path.startsWith('ja/') ? 'en' : 'ja', href: `${domain}/${alternate}` }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: `${domain}/${path.replace(/^ja\//, 'en/')}` }]
    ]
  }
})

function navEn() { return [
  { text: 'Start', link: '/en/guides/first-hour' }, { text: 'Combat', link: '/en/guides/combat-system' },
  { text: 'PC Help', link: '/en/guides/pc-requirements' }, { text: 'All Guides', link: '/en/guides/' }, { text: 'Report an Error', link: '/en/report-error' }
] }
function navJa() { return [
  { text: 'はじめに', link: '/ja/guides/first-hour' }, { text: '戦闘', link: '/ja/guides/combat-system' },
  { text: 'PCヘルプ', link: '/ja/guides/pc-requirements' }, { text: '全ガイド', link: '/ja/guides/' }, { text: '誤りを報告', link: '/ja/report-error' }
] }
function sidebarEn() { return [{ text: 'Guides', items: [
  { text: 'All guides', link: '/en/guides/' }, { text: 'Your first hour', link: '/en/guides/first-hour' },
  { text: 'How combat works', link: '/en/guides/combat-system' }, { text: 'Emma & Koo abilities', link: '/en/guides/emma-koo' },
  { text: 'PC requirements', link: '/en/guides/pc-requirements' }, { text: 'Release & platforms', link: '/en/guides/release-platforms' }
] }, { text: 'Site', items: [{ text: 'About', link: '/en/about' }, { text: 'Privacy', link: '/en/privacy' }, { text: 'Contact', link: '/en/contact' }] }] }
function sidebarJa() { return [{ text: 'ガイド', items: [
  { text: '全ガイド', link: '/ja/guides/' }, { text: '最初の1時間', link: '/ja/guides/first-hour' },
  { text: '戦闘システム', link: '/ja/guides/combat-system' }, { text: 'エマとクゥの能力', link: '/ja/guides/emma-koo' },
  { text: 'PC動作環境', link: '/ja/guides/pc-requirements' }, { text: '発売日と対応機種', link: '/ja/guides/release-platforms' }
] }, { text: 'サイト情報', items: [{ text: 'このサイトについて', link: '/ja/about' }, { text: 'プライバシー', link: '/ja/privacy' }, { text: 'お問い合わせ', link: '/ja/contact' }] }] }

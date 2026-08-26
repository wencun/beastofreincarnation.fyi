import { defineConfig } from 'vitepress'

const domain = 'https://beastofreincarnation.fyi'
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim()
const clarityId = process.env.CLARITY_ID?.trim()

const trackingHead = [
  ...(gaId ? [
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${gaId}` }],
    ['script', {}, `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`]
  ] : []),
  ...(clarityId ? [['meta', { name: 'clarity-id', content: clarityId }]] : [])
]

const keywordByPath: Record<string, string> = {
  '': 'Beast of Reincarnation guide, patch notes, PC help, Game Pass, DLSS, ultrawide',
  'en/': 'Beast of Reincarnation guide, patch notes, PC help, Game Pass, DLSS, ultrawide',
  'en/information/': 'Beast of Reincarnation information, release date, Game Pass, PS5, open world, gameplay, trailer, Switch 2, pre order',
  'en/information/game-pass': 'Beast of Reincarnation Game Pass, Xbox Game Pass, PC Game Pass, release date',
  'en/information/ps5': 'Beast of Reincarnation PS5, PlayStation 5, release date, gameplay',
  'en/information/open-world': 'Beast of Reincarnation open world, game world, verified information',
  'en/information/gameplay': 'Beast of Reincarnation gameplay, combat system, character abilities, Emma Koo',
  'en/information/trailers': 'Beast of Reincarnation trailer, official trailer, gameplay trailer',
  'en/information/switch-2': 'Beast of Reincarnation Switch 2, Nintendo Switch 2, platform availability',
  'en/information/editions': 'Beast of Reincarnation pre order, editions, bonuses, release date',
  'en/guides/release-platforms': 'Beast of Reincarnation release date, platforms, PS5, Xbox Series X S, PC, Game Pass',
  'en/guides/combat-system': 'Beast of Reincarnation combat system, gameplay, character abilities, Emma Koo',
  'en/guides/emma-koo': 'Beast of Reincarnation Emma Koo, character abilities, combat system',
  'en/guides/pc-requirements': 'Beast of Reincarnation PC requirements, system requirements, PC game',
  'en/guides/first-hour': 'Beast of Reincarnation beginner guide, first hour, gameplay guide',
  'en/guides/missing-pre-order-bonus-dlc': 'Beast of Reincarnation missing pre order bonus, missing DLC, Deluxe DLC, Steam support',
  'en/guides/troubleshooting/patch-v1-0-8': 'Beast of Reincarnation patch 1.0.8, v1.006.000, DLSS 4.5, FSR4, frame generation, ultrawide',
  'en/guides/troubleshooting/ultrawide-dlss-fsr-status': 'Beast of Reincarnation DLSS PC Game Pass, FSR4, ultrawide, frame generation',
  'fr/': 'Beast of Reincarnation guide, date de sortie, Game Pass, PS5, monde ouvert, gameplay, bande annonce, Switch 2',
  'fr/information/': 'Beast of Reincarnation informations verifiees, date de sortie, Game Pass, PS5, monde ouvert, gameplay, bande annonce, Switch 2, precommande',
  'fr/information/game-pass': 'Beast of Reincarnation Game Pass, Xbox Game Pass, PC Game Pass',
  'fr/information/ps5': 'Beast of Reincarnation PS5, PlayStation 5, date de sortie',
  'fr/information/open-world': 'Beast of Reincarnation monde ouvert, informations verifiees',
  'fr/information/gameplay': 'Beast of Reincarnation gameplay, systeme de combat, capacites',
  'fr/information/trailers': 'Beast of Reincarnation bande annonce, trailer officiel, gameplay',
  'fr/information/switch-2': 'Beast of Reincarnation Switch 2, Nintendo Switch 2',
  'fr/information/editions': 'Beast of Reincarnation precommande, editions, bonus',
  'fr/guides/missing-pre-order-bonus-dlc': 'Beast of Reincarnation bonus de precommande manquant, DLC manquant, support Steam',
  'ja/guides/release-platforms': 'Beast of Reincarnation release date, PS5, Xbox Series X S, PC, Game Pass',
  'ja/guides/combat-system': 'Beast of Reincarnation combat system, gameplay, character abilities',
  'ja/guides/pc-requirements': 'Beast of Reincarnation PC requirements, system requirements'
}

const defaultKeywordsByLocale: Record<string, string> = {
  en: 'Beast of Reincarnation, Beast of Reincarnation guide, game guide, verified information, combat system, release date, unofficial fan guide',
  fr: 'Beast of Reincarnation, guide Beast of Reincarnation, informations verifiees, date de sortie, Game Pass, PS5',
  ja: 'Beast of Reincarnation, 攻略, 戦闘システム, 発売日, PC 必要動作環境'
}

function keywordsFor(path: string) {
  if (keywordByPath[path]) return keywordByPath[path]
  if (path.startsWith('fr/')) return defaultKeywordsByLocale.fr
  if (path.startsWith('ja/')) return defaultKeywordsByLocale.ja
  return defaultKeywordsByLocale.en
}

export default defineConfig({
  title: 'Beast of Reincarnation Guide',
  description: 'Fast, verified answers for Beast of Reincarnation players.',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: domain },
  head: [
    ...trackingHead,
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#d4ff5c' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Beast of Reincarnation Guide' }]
  ],
  themeConfig: {
    logo: { src: '/mark.svg', alt: 'BOR Guide' },
    search: { provider: 'local', options: { locales: { ja: { translations: { button: { buttonText: '検索', buttonAriaLabel: '検索' }, modal: { noResultsText: '結果がありません', resetButtonTitle: '検索をリセット', footer: { selectText: '選択', navigateText: '移動', closeText: '閉じる' } } } } } } },
    socialLinks: [],
    footer: { message: 'Unofficial fan guide. Not affiliated with or endorsed by GAME FREAK, Fictions, or platform holders.', copyright: '© 2026 beastofreincarnation.fyi' }
  },
  locales: {
    root: { label: 'English', lang: 'en', link: '/en/', themeConfig: { nav: navEn(), sidebar: sidebarEn(), outline: { label: 'On this page' }, docFooter: { prev: 'Previous', next: 'Next' } } },
    fr: { label: 'Francais', lang: 'fr', link: '/fr/', themeConfig: { nav: navFr(), sidebar: sidebarFr(), outline: { label: 'Sur cette page' }, docFooter: { prev: 'Precedent', next: 'Suivant' }, footer: { message: 'Guide de fans non officiel. Sans affiliation ni approbation de GAME FREAK, Fictions ou des plateformes.', copyright: '© 2026 beastofreincarnation.fyi' } } },
    ja: { label: '日本語', lang: 'ja', link: '/ja/', themeConfig: { nav: navJa(), sidebar: sidebarJa(), outline: { label: 'このページの内容' }, lastUpdated: { text: '最終更新' }, docFooter: { prev: '前へ', next: '次へ' }, footer: { message: '非公式ファン攻略サイトです。GAME FREAK、Fictions、各プラットフォームとは関係なく、公認も受けていません。', copyright: '© 2026 beastofreincarnation.fyi' } } }
  },
  transformHead({ pageData }) {
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const canonical = `${domain}/${path}`
    const hasFrenchTranslation = path.startsWith('en/') || path.startsWith('fr/')
    const locale = path.startsWith('fr/') ? 'fr' : path.startsWith('ja/') ? 'ja' : path.startsWith('en/') ? 'en' : ''
    const route = locale ? path.slice(locale.length + 1) : ''
    const alternateLocales = hasFrenchTranslation ? ['en', 'fr'] : locale ? ['en', 'ja'] : []
    const alternateLinks = alternateLocales.map((language) => [
      'link',
      { rel: 'alternate', hreflang: language, href: `${domain}/${language}/${route}` }
    ])

    const keywords = keywordsFor(path)

    return [
      ['link', { rel: 'canonical', href: canonical }],
      ...(keywords ? [['meta', { name: 'keywords', content: keywords }]] : []),
      ...alternateLinks,
      ...(alternateLocales.length ? [['link', { rel: 'alternate', hreflang: 'x-default', href: `${domain}/en/${route}` }]] : [])
    ]
  }
})

function navEn() { return [
  { text: 'Start', link: '/en/guides/first-hour' }, { text: 'Combat', link: '/en/guides/combat-system' },
  { text: 'Verified info', link: '/en/information/' }, { text: 'PC Help', link: '/en/guides/pc-requirements' },
  { text: 'All Guides', link: '/en/guides/' }, { text: 'Report an Error', link: '/en/report-error' }
] }
function navFr() { return [
  { text: 'Debuter', link: '/fr/guides/first-hour' }, { text: 'Combat', link: '/fr/guides/combat-system' },
  { text: 'Infos verifiees', link: '/fr/information/' }, { text: 'Aide PC', link: '/fr/guides/pc-requirements' },
  { text: 'Tous les guides', link: '/fr/guides/' }, { text: 'Signaler une erreur', link: '/fr/report-error' }
] }
function navJa() { return [
  { text: 'はじめに', link: '/ja/guides/first-hour' }, { text: '戦闘', link: '/ja/guides/combat-system' },
  { text: 'PCヘルプ', link: '/ja/guides/pc-requirements' }, { text: '全ガイド', link: '/ja/guides/' }, { text: '誤りを報告', link: '/ja/report-error' }
] }
function sidebarEn() { return [
  { text: 'Verified Information', items: [
    { text: 'All verified information', link: '/en/information/' }, { text: 'Game Pass', link: '/en/information/game-pass' },
    { text: 'PS5', link: '/en/information/ps5' }, { text: 'Is it open world?', link: '/en/information/open-world' },
    { text: 'Gameplay explained', link: '/en/information/gameplay' }, { text: 'Official trailers', link: '/en/information/trailers' },
    { text: 'Nintendo Switch 2', link: '/en/information/switch-2' }, { text: 'Editions and bonuses', link: '/en/information/editions' }
  ] },
  { text: 'Guides', items: [
    { text: 'All guides', link: '/en/guides/' }, { text: 'Your first hour', link: '/en/guides/first-hour' },
    { text: 'How combat works', link: '/en/guides/combat-system' }, { text: 'Emma & Koo abilities', link: '/en/guides/emma-koo' },
    { text: 'PC requirements', link: '/en/guides/pc-requirements' }, { text: 'Release & platforms', link: '/en/guides/release-platforms' },
    { text: 'Troubleshooting hub', link: '/en/guides/troubleshooting/' }, { text: 'PC crashes', link: '/en/guides/troubleshooting/pc-crashing' }, { text: 'UE5 crash on launch', link: '/en/guides/troubleshooting/ue5-crash-on-launch' },
    { text: 'Patch v1.0.8', link: '/en/guides/troubleshooting/patch-v1-0-8' }, { text: 'Patch v1.0.7 (previous)', link: '/en/guides/troubleshooting/patch-v1-0-7' }, { text: 'Controller settings', link: '/en/guides/troubleshooting/controller-settings' },
    { text: 'Cutscene performance mode', link: '/en/guides/troubleshooting/cutscene-performance-mode' }, { text: 'Deluxe upgrade', link: '/en/guides/troubleshooting/deluxe-upgrade' },
    { text: 'Missing bonus or DLC', link: '/en/guides/missing-pre-order-bonus-dlc' }, { text: 'Known issues & patch status', link: '/en/guides/known-issues-patch-status' }
  ] },
  { text: 'Site', items: [{ text: 'About', link: '/en/about' }, { text: 'Privacy', link: '/en/privacy' }, { text: 'Contact', link: '/en/contact' }] }
] }
function sidebarFr() { return [
  { text: 'Informations verifiees', items: [
    { text: 'Toutes les informations', link: '/fr/information/' }, { text: 'Game Pass', link: '/fr/information/game-pass' },
    { text: 'PS5', link: '/fr/information/ps5' }, { text: 'Monde ouvert ?', link: '/fr/information/open-world' },
    { text: 'Gameplay', link: '/fr/information/gameplay' }, { text: 'Bandes-annonces', link: '/fr/information/trailers' },
    { text: 'Nintendo Switch 2', link: '/fr/information/switch-2' }, { text: 'Editions et bonus', link: '/fr/information/editions' }
  ] },
  { text: 'Guides', items: [
    { text: 'Tous les guides', link: '/fr/guides/' }, { text: 'Premiere heure', link: '/fr/guides/first-hour' },
    { text: 'Systeme de combat', link: '/fr/guides/combat-system' }, { text: 'Capacites d Emma et Koo', link: '/fr/guides/emma-koo' },
    { text: 'Configuration PC', link: '/fr/guides/pc-requirements' }, { text: 'Sortie et plateformes', link: '/fr/guides/release-platforms' },
    { text: 'Bonus ou DLC manquant', link: '/fr/guides/missing-pre-order-bonus-dlc' }
  ] },
  { text: 'Site', items: [{ text: 'A propos', link: '/fr/about' }, { text: 'Confidentialite', link: '/fr/privacy' }, { text: 'Contact', link: '/fr/contact' }] }
] }
function sidebarJa() { return [
  { text: 'ガイド', items: [
    { text: '全ガイド', link: '/ja/guides/' }, { text: '最初の1時間', link: '/ja/guides/first-hour' },
    { text: '戦闘システム', link: '/ja/guides/combat-system' }, { text: 'エマとクゥの能力', link: '/ja/guides/emma-koo' },
    { text: 'PC動作環境', link: '/ja/guides/pc-requirements' }, { text: '発売日と対応機種', link: '/ja/guides/release-platforms' }
  ] },
  { text: 'サイト情報', items: [{ text: 'このサイトについて', link: '/ja/about' }, { text: 'プライバシー', link: '/ja/privacy' }, { text: 'お問い合わせ', link: '/ja/contact' }] }
] }

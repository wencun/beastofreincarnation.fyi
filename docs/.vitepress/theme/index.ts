import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import AdSenseContentAd from './AdSenseContentAd.vue'
import TrackingConsent from './TrackingConsent.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'home-hero-before': () => h(AdSenseContentAd, { placement: 'home' }),
    'doc-before': () => h(AdSenseContentAd, { placement: 'top' }),
    'doc-after': () => h(AdSenseContentAd, { placement: 'bottom' }),
    'layout-bottom': () => h(TrackingConsent)
  })
}

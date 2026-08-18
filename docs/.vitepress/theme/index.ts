import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import AdsterraContentAd from './AdsterraContentAd.vue'
import AdsterraHomeAd from './AdsterraHomeAd.vue'
import TrackingConsent from './TrackingConsent.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'home-hero-before': () => h(AdsterraHomeAd),
    'doc-before': () => h(AdsterraContentAd, { placement: 'top' }),
    'doc-after': () => h(AdsterraContentAd, { placement: 'bottom' }),
    'layout-bottom': () => h(TrackingConsent)
  })
}

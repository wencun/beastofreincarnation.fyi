import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import GuideAd from './GuideAd.vue'
import TrackingConsent from './TrackingConsent.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GuideAd', GuideAd)
  },
  Layout: () => h(DefaultTheme.Layout, null, {
    'doc-after': () => h(GuideAd),
    'layout-bottom': () => h(TrackingConsent)
  })
}

import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import TrackingConsent from './TrackingConsent.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-bottom': () => h(TrackingConsent)
  })
}

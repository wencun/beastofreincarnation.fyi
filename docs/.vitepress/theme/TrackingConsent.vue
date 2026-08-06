<script setup lang="ts">
import { onMounted, ref } from 'vue'

const storageKey = 'bor-analytics-consent'
const visible = ref(false)

const labels = {
  en: {
    text: 'We use optional analytics to understand site use and improve the guide.',
    accept: 'Accept analytics',
    reject: 'Decline'
  },
  fr: {
    text: 'Nous utilisons des mesures d audience facultatives pour ameliorer ce guide.',
    accept: 'Accepter',
    reject: 'Refuser'
  },
  ja: {
    text: 'このガイドの改善のため、任意のアクセス解析を使用します。',
    accept: '同意する',
    reject: '拒否する'
  }
}

const language = () => document.documentElement.lang.startsWith('fr') ? 'fr' : document.documentElement.lang.startsWith('ja') ? 'ja' : 'en'
const copy = ref(labels.en)

function updateGoogleConsent(granted: boolean) {
  window.gtag?.('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  })
}

function loadClarity() {
  const id = document.querySelector('meta[name="clarity-id"]')?.getAttribute('content')
  if (!id || document.querySelector('script[data-clarity]')) return

  const script = document.createElement('script')
  script.dataset.clarity = 'true'
  script.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${id}");`
  document.head.appendChild(script)
}

function choose(granted: boolean) {
  localStorage.setItem(storageKey, granted ? 'granted' : 'denied')
  updateGoogleConsent(granted)
  if (granted) loadClarity()
  visible.value = false
}

onMounted(() => {
  copy.value = labels[language()]
  const choice = localStorage.getItem(storageKey)
  if (choice === 'granted') {
    updateGoogleConsent(true)
    loadClarity()
    return
  }
  if (choice === 'denied') {
    updateGoogleConsent(false)
    return
  }
  visible.value = true
})
</script>

<template>
  <aside v-if="visible" class="tracking-consent" role="dialog" aria-live="polite">
    <p>{{ copy.text }} <a href="/en/privacy">Privacy</a></p>
    <div class="tracking-consent-actions">
      <button class="tracking-consent-decline" type="button" @click="choose(false)">{{ copy.reject }}</button>
      <button class="tracking-consent-accept" type="button" @click="choose(true)">{{ copy.accept }}</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{ placement: 'home' | 'top' | 'bottom' }>()

const client = 'ca-pub-4539826019899948'
const slot = '4513023247'
let adsenseLoader: Promise<void> | null = null

function loadAdsense() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (adsenseLoader) return adsenseLoader

  const existing = document.querySelector<HTMLScriptElement>('script[data-adsense-client="ca-pub-4539826019899948"]')
  if (existing) {
    adsenseLoader = Promise.resolve()
    return adsenseLoader
  }

  adsenseLoader = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.dataset.adsenseClient = client
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('AdSense script failed to load'))
    document.head.appendChild(script)
  })

  return adsenseLoader
}

onMounted(async () => {
  try {
    await loadAdsense()
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {
    // Keep the guide usable if an ad blocker or network policy blocks the ad script.
  }
})
</script>

<template>
  <div
    class="adsense-slot"
    :class="`adsense-slot--${placement}`"
    aria-label="Advertisement"
  >
    <ins
      class="adsbygoogle"
      style="display:block"
      :data-ad-client="client"
      :data-ad-slot="slot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</template>

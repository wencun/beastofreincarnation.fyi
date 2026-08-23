<script setup lang="ts">
import { onMounted } from 'vue'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

const props = defineProps<{ placement: 'home' | 'top' | 'bottom' }>()

function requestAd() {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {
    // AdSense can decline an individual placement while the site or a page is being reviewed.
  }
}

onMounted(() => {
  const selector = 'script[data-adsense-client="ca-pub-4539826019899948"]'
  const existing = document.querySelector<HTMLScriptElement>(selector)

  if (existing) {
    if (window.adsbygoogle) requestAd()
    else existing.addEventListener('load', requestAd, { once: true })
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.dataset.adsenseClient = 'ca-pub-4539826019899948'
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4539826019899948'
  script.addEventListener('load', requestAd, { once: true })
  document.head.appendChild(script)
})
</script>

<template>
  <div
    class="adsense-slot adsense-content"
    :class="`adsense-content--${props.placement}`"
    aria-label="Advertisement"
  >
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-4539826019899948"
      data-ad-slot="4513023247"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</template>

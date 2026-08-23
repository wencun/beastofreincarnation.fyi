<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ placement: 'home' | 'top' | 'bottom' }>()

const client = 'ca-pub-4539826019899948'
const slots = {
  home: '5787696026',
  top: '6909206005',
  bottom: '5802184062'
} as const
const slot = computed(() => slots[props.placement])
const container = ref<HTMLElement | null>(null)
let adsenseLoader: Promise<void> | null = null
let statusObserver: MutationObserver | null = null

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

function updateFillState() {
  const ad = container.value?.querySelector('.adsbygoogle')
  if (ad?.getAttribute('data-ad-status') === 'unfilled') {
    container.value?.classList.add('adsense-slot--unfilled')
  }
}

onMounted(async () => {
  statusObserver = new MutationObserver(updateFillState)
  if (container.value) {
    statusObserver.observe(container.value, {
      attributes: true,
      attributeFilter: ['data-ad-status'],
      childList: true,
      subtree: true
    })
  }

  try {
    await loadAdsense()
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    updateFillState()
  } catch {
    // Keep the guide usable if an ad blocker or network policy blocks the ad script.
  }
})

onBeforeUnmount(() => statusObserver?.disconnect())
</script>

<template>
  <div
    ref="container"
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

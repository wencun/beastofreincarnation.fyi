<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ placement: 'top' | 'bottom' }>()
const host = ref<HTMLDivElement>()
let disposed = false

const topDesktop = {
  key: '55f95785b3687849d9647354adcfb1a0',
  width: 728,
  height: 90
}
const topMobile = {
  key: '1f8e53c1ed4f523f77e2332b47420e51',
  width: 320,
  height: 50
}
const bottom = {
  key: 'f7504fde89cbad5f643b701d9cd08350',
  width: 300,
  height: 250
}

function loadAd() {
  if (typeof window === 'undefined' || !host.value) return
  const unit = props.placement === 'bottom'
    ? bottom
    : window.matchMedia('(max-width: 767px)').matches ? topMobile : topDesktop

  const run = () => new Promise<void>((resolve) => {
    if (disposed || !host.value) return resolve()
    ;(window as Window & { atOptions?: unknown }).atOptions = {
      key: unit.key,
      format: 'iframe',
      height: unit.height,
      width: unit.width,
      params: {}
    }

    const script = document.createElement('script')
    script.src = `https://www.highperformanceformat.com/${unit.key}/invoke.js`
    script.onload = () => resolve()
    script.onerror = () => resolve()
    host.value.appendChild(script)
  })

  const globalWindow = window as Window & { __borAdsterraQueue?: Promise<void> }
  const previous = globalWindow.__borAdsterraQueue || Promise.resolve()
  globalWindow.__borAdsterraQueue = previous.then(run, run)
}

onMounted(async () => {
  await nextTick()
  loadAd()
})

onBeforeUnmount(() => {
  disposed = true
})
</script>

<template>
  <div
    ref="host"
    class="adsterra-slot adsterra-content"
    :class="`adsterra-content--${placement}`"
    aria-label="Advertisement"
  />
</template>

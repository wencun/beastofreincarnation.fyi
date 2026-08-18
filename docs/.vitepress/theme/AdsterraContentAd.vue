<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ placement: 'top' | 'bottom' }>()
const mounted = ref(false)

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

const unit = computed(() => {
  if (props.placement === 'bottom') return bottom
  if (mounted.value && typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) return topMobile
  return topDesktop
})

const srcdoc = computed(() => `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body><script>atOptions={key:'${unit.value.key}',format:'iframe',height:${unit.value.height},width:${unit.value.width},params:{}};<\/script><script src="https://www.highperformanceformat.com/${unit.value.key}/invoke.js"><\/script></body></html>`)

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <div
    class="adsterra-slot adsterra-content"
    :class="`adsterra-content--${placement}`"
    aria-label="Advertisement"
  >
    <iframe
      class="adsterra-frame"
      :srcdoc="srcdoc"
      :title="placement === 'top' ? 'Advertisement' : 'Advertisement'"
      :width="unit.width"
      :height="unit.height"
      frameborder="0"
      scrolling="no"
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
    />
  </div>
</template>

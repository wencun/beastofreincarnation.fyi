<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ placement: 'top' | 'bottom' }>()
const mounted = ref(false)

const topDesktop = {
  src: '/ads/adsterra-300x250.html',
  width: 300,
  height: 250
}
const topMobile = {
  src: '/ads/adsterra-320x50.html',
  width: 320,
  height: 50
}
const bottom = {
  src: '/ads/adsterra-300x250.html',
  width: 300,
  height: 250
}

const unit = computed(() => {
  if (props.placement === 'bottom') return bottom
  if (mounted.value && typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) return topMobile
  return topDesktop
})

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
      :src="unit.src"
      title="Advertisement"
      :width="unit.width"
      :height="unit.height"
      frameborder="0"
      scrolling="no"
      referrerpolicy="strict-origin-when-cross-origin"
    />
  </div>
</template>

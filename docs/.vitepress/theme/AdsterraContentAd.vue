<script setup lang="ts">
const props = defineProps<{ placement: 'home' | 'top' | 'bottom' }>()
</script>

<template>
  <div class="adsterra-slot" :class="`adsterra-slot--${placement}`" aria-label="Advertisement">
    <iframe
      class="adsterra-slot__desktop"
      src="/ads/adsterra-728x90.html"
      title="Advertisement"
      width="728"
      height="90"
      scrolling="no"
      frameborder="0"
    />
    <iframe
      class="adsterra-slot__mobile"
      src="/ads/adsterra-320x50.html"
      title="Advertisement"
      width="320"
      height="50"
      scrolling="no"
      frameborder="0"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const isGuide = computed(() => /^(en|fr|ja)\/guides\/(?!index\.md)/.test(page.value.relativePath))

async function requestAd() {
  if (!isGuide.value || typeof window === 'undefined') return
  await nextTick()
  try { ;(window.adsbygoogle = window.adsbygoogle || []).push({}) } catch { /* AdSense may be blocked or not approved yet. */ }
}

onMounted(requestAd)
watch(() => page.value.relativePath, requestAd)
</script>

<template>
  <div v-if="isGuide" class="guide-ad" aria-label="Advertisement">
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4539826019899948" data-ad-slot="4513023247" data-ad-format="auto" data-full-width-responsive="true"></ins>
  </div>
</template>

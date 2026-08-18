<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const host = ref<HTMLDivElement>()

onMounted(async () => {
  if (typeof window === 'undefined' || !host.value) return
  await nextTick()

  const container = document.createElement('div')
  container.id = 'container-0c61578755b5d5a2adbc530e2d53d552'
  host.value.appendChild(container)

  const script = document.createElement('script')
  script.async = true
  script.setAttribute('data-cfasync', 'false')
  script.src = 'https://pl30902713.effectivecpmnetwork.com/0c61578755b5d5a2adbc530e2d53d552/invoke.js'
  host.value.appendChild(script)
})
</script>

<template>
  <div ref="host" class="adsterra-slot adsterra-home" aria-label="Advertisement" />
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const { route } = useData()
const id = 'adsterra-content-mid'

function removeSlot() {
  document.getElementById(id)?.remove()
}

function mountSlot() {
  removeSlot()

  // Only guide articles with enough content receive a mid-content placement.
  if (!route.path.includes('/guides/') || route.path.endsWith('/guides/')) return

  const article = document.querySelector<HTMLElement>('.VPDoc .vp-doc')
  const headings = article?.querySelectorAll('h2')
  if (!article || !headings || headings.length < 2) return

  const slot = document.createElement('div')
  slot.id = id
  slot.className = 'adsterra-slot adsterra-slot--mid'
  slot.setAttribute('aria-label', 'Advertisement')

  const frame = document.createElement('iframe')
  frame.src = '/ads/adsterra-300x250.html'
  frame.title = 'Advertisement'
  frame.width = '300'
  frame.height = '250'
  frame.scrolling = 'no'
  frame.setAttribute('frameborder', '0')
  frame.loading = 'lazy'

  slot.append(frame)
  article.insertBefore(slot, headings[1])
}

onMounted(() => void nextTick(mountSlot))
watch(() => route.path, () => void nextTick(mountSlot))
onBeforeUnmount(removeSlot)
</script>

<template><span aria-hidden="true" /></template>

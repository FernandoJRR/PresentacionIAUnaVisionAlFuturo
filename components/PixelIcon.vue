<!--
  8x8 pixel icons drawn in currentColor.

    <PixelIcon name="in" />
    <PixelIcon name="gh" />
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: 'gh' },
})

// K filled, B knocked out (page color)
const ICONS = {
  in: [
    '.KKKKKK.',
    'KBKKKKKK',
    'KKKKKKKK',
    'KBKBBBKK',
    'KBKBKKBK',
    'KBKBKKBK',
    'KBKBKKBK',
    '.KKKKKK.',
  ],
  gh: [
    '.KK..KK.',
    '.KKKKKK.',
    'KKKKKKKK',
    'KKBKKBKK',
    'KKKKKKKK',
    '.KKKKKK.',
    '..KKKK..',
    '.K.KK...',
  ],
}

const cells = computed(() => {
  const out = []
  ;(ICONS[props.name] ?? ICONS.gh).forEach((row, y) =>
    [...row].forEach((ch, x) => ch !== '.' && out.push({ x, y, ch })))
  return out
})
</script>

<template>
  <svg viewBox="0 0 8 8" class="pixel-icon" shape-rendering="crispEdges" aria-hidden="true">
    <rect v-for="(c, i) in cells" :key="i" :class="`px-${c.ch}`" :x="c.x" :y="c.y" width="1" height="1" />
  </svg>
</template>

<style scoped>
.pixel-icon { display: inline-block; width: 16px; height: 16px; vertical-align: -3px; }
.px-K { fill: currentColor; }
.px-B { fill: var(--page, #fff); }
</style>

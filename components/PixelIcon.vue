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
  // Timeline icons
  gear: [
    '...KK...',
    '.K.KK.K.',
    '..KKKK..',
    'KKK..KKK',
    'KKK..KKK',
    '..KKKK..',
    '.K.KK.K.',
    '...KK...',
  ],
  speaker: [
    '...K....',
    '..KK..K.',
    'KKKK.K..',
    'KKKK.K.K',
    'KKKK.K.K',
    'KKKK.K..',
    '..KK..K.',
    '...K....',
  ],
  train: [
    '.KKKKKK.',
    'KK....KK',
    'KK....KK',
    'KKKKKKKK',
    'KBKKKKBK',
    'KKKKKKKK',
    '.K....K.',
    'KKKKKKKK',
  ],
  card: [
    '........',
    'KKKKKKKK',
    'KKKKKKKK',
    'K......K',
    'K.KK...K',
    'K......K',
    'KKKKKKKK',
    '........',
  ],
  digit: [
    'KKKKKK..',
    'K....KK.',
    'K.KKK.KK',
    'K...K..K',
    'K..K...K',
    'K..K...K',
    'K......K',
    'KKKKKKKK',
  ],
  cart: [
    'KK......',
    '.K......',
    '.KKKKKKK',
    '.KKKKKKK',
    '..KKKKKK',
    '..KKKKK.',
    '........',
    '..K..K..',
  ],
  mail: [
    '........',
    'KKKKKKKK',
    'KK....KK',
    'K.K..K.K',
    'K..KK..K',
    'K......K',
    'KKKKKKKK',
    '........',
  ],
  globe: [
    '..KKKK..',
    '.K.KK.K.',
    'K.K..K.K',
    'KKKKKKKK',
    'K.K..K.K',
    'K.K..K.K',
    '.K.KK.K.',
    '..KKKK..',
  ],
  eye: [
    '........',
    '..KKKK..',
    '.K....K.',
    'K..KK..K',
    'K..KK..K',
    '.K....K.',
    '..KKKK..',
    '........',
  ],
  camera: [
    '..KKK...',
    'KKKKKKKK',
    'KKK..KKK',
    'KK.KK.KK',
    'KK.KK.KK',
    'KKK..KKK',
    'KKKKKKKK',
    '........',
  ],
  helix: [
    'K......K',
    '.KKKKKK.',
    '..K..K..',
    '...KK...',
    '...KK...',
    '..K..K..',
    '.KKKKKK.',
    'K......K',
  ],
  cloud: [
    '...KK...',
    '.KKKKK..',
    'KKKKKKK.',
    'KKKKKKKK',
    '.KKKKKK.',
    '........',
    '.K..K..K',
    'K..K..K.',
  ],
  chat: [
    '.KKKKKK.',
    'KKKKKKKK',
    'KKBKKBKK',
    'KKKKKKKK',
    '.KKKKKK.',
    '..KK....',
    '.K......',
    '........',
  ],
  mic: [
    '..KKKK..',
    '..KKKK..',
    '..KKKK..',
    'K.KKKK.K',
    '.K.KK.K.',
    '..KKKK..',
    '...KK...',
    '..KKKK..',
  ],
  code: [
    '.....K..',
    '.....K..',
    '.K..K.K.',
    'K...K..K',
    'K..K...K',
    '.K.K..K.',
    '..K.....',
    '..K.....',
  ],
  book: [
    'KKKKKKK.',
    'K.....KK',
    'K.KKK.KK',
    'K.....KK',
    'K.KKK.KK',
    'K.....KK',
    'KKKKKKKK',
    '.KKKKKKK',
  ],
  disc: [
    '..KKKK..',
    '.KKKKKK.',
    'KKKKKKKK',
    'KKK..KKK',
    'KKK..KKK',
    'KKKKKKKK',
    '.KKKKKK.',
    '..KKKK..',
  ],
  pad: [
    '........',
    '.KKKKKK.',
    'KKBKKKKK',
    'KBBBKKBK',
    'KKBKKBKK',
    'KKKKKKKK',
    'KK....KK',
    '........',
  ],
  phones: [
    '..KKKK..',
    '.K....K.',
    'K......K',
    'K......K',
    'KK....KK',
    'KKK..KKK',
    'KKK..KKK',
    '.K....K.',
  ],
  doc: [
    'KKKKK...',
    'K...KK..',
    'K...KKK.',
    'K.KKK.K.',
    'K.....K.',
    'K.KKK.K.',
    'K.....K.',
    'KKKKKKK.',
  ],
  search: [
    '.KKKK...',
    'K....K..',
    'K....K..',
    'K....K..',
    'K....K..',
    '.KKKKK..',
    '.....KK.',
    '......KK',
  ],
  db: [
    '.KKKKKK.',
    'K......K',
    '.KKKKKK.',
    'K......K',
    '.KKKKKK.',
    'K......K',
    'K......K',
    '.KKKKKK.',
  ],
  ticket: [
    '........',
    'KKKKKKKK',
    'KBKBBBBK',
    '.KKKKKK.',
    '.KKKKKK.',
    'KBKBBBBK',
    'KKKKKKKK',
    '........',
  ],
  wave: [
    '....K...',
    '..K.K...',
    '..K.K.K.',
    'K.K.K.K.',
    'K.K.K.K.',
    '..K.K.K.',
    '..K.K...',
    '....K...',
  ],
  check: [
    '........',
    '.......K',
    '......KK',
    'K....KK.',
    'KK..KK..',
    '.KKKK...',
    '..KK....',
    '........',
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

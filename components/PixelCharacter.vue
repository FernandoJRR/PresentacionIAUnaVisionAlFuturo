<!--
  PixelCharacter.vue — tiny silhouette sprites (16x20) with idle animations.
  Drop into your Slidev project's components/ folder.

    <PixelCharacter who="mage" class="w-40" />
    <PixelCharacter who="scribe" palette="night" class="w-40" />
    <PixelCharacter who="mage" facing="left" class="w-40" />

  Props
    who:     'mage' | 'scribe'
    palette: 'parchment' | 'night'
    facing:  'front' | 'left' | 'right'
  Size it with width (any multiple of 16px stays crisp: 64, 96, 128, 160...).
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  who: { type: String, default: 'mage' },
  palette: { type: String, default: 'parchment' },
  facing: { type: String, default: 'front' },
})

// K ink, A accent, Y gold, B background (eyes, beard, paper)
const FRONT = {
  mage: [
    '..........K.....',
    '.........KK.....',
    '........KK......',
    '.......KKK......',
    '......KKKK......',
    '......KKKKK.....',
    '....KKKKKKKKK...',
    '......KBKBK..YY.',
    '......KKKKK.YYYY',
    '.....KBBBBBKYYYY',
    '....AKBBBBBKAYY.',
    '....AAKBBBKAAK..',
    '....AAAKBKAAA...',
    '....AAAAKAAAA...',
    '...AAAAAYAAAA...',
    '...AAAAAAAAAA...',
    '..AAAAAAAAAAAA..',
    '..AAAAAAAAAAAA..',
    '...KK......KK...',
    '................',
  ],
  scribe: [
    '................',
    '................',
    '................',
    '.....KKKKKK.....',
    '.....AAAAAA.....',
    '....KKKKKKKK....',
    '.....KKKKKK.....',
    '.....KBKKBK.....',
    '.....KKKKKK.....',
    '......KKKK......',
    '....KKKKKKKK....',
    '.KKKKKKKKKKKK...',
    '.KBBBBKKKKKKK...',
    '.KBKKBBKKKKKK...',
    '.KBKBBBKKKKKK...',
    '.KKKKKKKKKKKK...',
    '....KKKKKKKK....',
    '....KKK..KKK....',
    '....KKK..KKK....',
    '...KKKK..KKKK...',
  ],
}


// Side views, drawn facing right. Facing left mirrors these.
const SIDE = {
  mage: [
    '....K...........',
    '....KK..........',
    '.....KK.........',
    '.....KKK........',
    '.....KKKK.......',
    '....KKKKKK......',
    '..KKKKKKKKKK....',
    '.....KKKBK...YY.',
    '.....KKKKKK.YYYY',
    '.....KKKBBBKYYYY',
    '....AAKKBBBKAYY.',
    '....AAAKBBKAAK..',
    '....AAAAKBKAA...',
    '....AAAAAKAAA...',
    '...AAAAAAAYAA...',
    '...AAAAAAAAAA...',
    '..AAAAAAAAAAA...',
    '..AAAAAAAAAAAA..',
    '...KK.....KKK...',
    '................',
  ],
  scribe: [
    '................',
    '................',
    '................',
    '....KKKKKK......',
    '....AAAAAA......',
    '...KKKKKKKK.....',
    '....KKKKKK......',
    '....KKKKBK......',
    '....KKKKKKK.....',
    '.....KKKK.......',
    '....KKKKKK......',
    '...KKKKKKKKKKK..',
    '...KKKKKBBBBBK..',
    '...KKKKKBKKBBK..',
    '...KKKKKBKBBBK..',
    '...KKKKKKKKKKK..',
    '....KKKKKK......',
    '....KKK.KKK.....',
    '....KKK.KKK.....',
    '....KKKK.KKKK...',
  ],
}

// Animated overlays (x, y in cells), per view
const EYES = {
  front: { mage: [[7, 7], [9, 7]], scribe: [[6, 7], [9, 7]] },
  side: { mage: [[8, 7]], scribe: [[8, 7]] },
}
const PEN = { front: [[6, 12], [5, 13]], side: [[13, 11], [12, 12]] }
const SPARKLES = [[14, 5], [11, 7], [15, 11]]

function runs(grid) {
  const out = []
  grid.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      let e = x
      while (e + 1 < row.length && row[e + 1] === ch) e++
      if (ch !== '.') out.push({ x, y, w: e - x + 1, ch })
      x = e + 1
    }
  })
  return out
}

const view = computed(() => (props.facing === 'front' ? 'front' : 'side'))
const who = computed(() => (props.who === 'scribe' ? 'scribe' : 'mage'))
const pixels = computed(() => runs((view.value === 'front' ? FRONT : SIDE)[who.value]))
const eyes = computed(() => EYES[view.value][who.value])
const pen = computed(() => PEN[view.value])
const mirror = computed(() => (props.facing === 'left' ? 'translate(16,0) scale(-1,1)' : undefined))
</script>

<template>
  <svg
    viewBox="0 0 16 20"
    class="pixel-char"
    :class="[`pal-${palette}`, `who-${who}`]"
    shape-rendering="crispEdges"
    role="img"
    :aria-label="who === 'scribe' ? 'Pixel scribe with a pork pie hat writing in a notebook' : 'Pixel wizard holding a glowing orb'"
  >
    <g :transform="mirror">
    <g class="body">
      <rect v-for="(p, i) in pixels" :key="i" :class="`px-${p.ch}`" :x="p.x" :y="p.y" :width="p.w" height="1" />
      <rect v-for="(e, i) in eyes" :key="`e${i}`" class="lid" :x="e[0]" :y="e[1]" width="1" height="1" />

      <template v-if="who === 'mage'">
        <rect v-for="(s, i) in SPARKLES" :key="`s${i}`" class="spark" :x="s[0]" :y="s[1]" width="1" height="1"
          :style="{ animationDelay: `${i * 0.3}s` }" />
      </template>

      <g v-else class="pen">
        <rect v-for="(p, i) in pen" :key="`p${i}`" class="px-Y" :x="p[0]" :y="p[1]" width="1" height="1" />
      </g>
    </g>
    </g>
  </svg>
</template>

<style scoped>
.pal-parchment { --bg: #efe3c2; --ink: #3d2b22; --accent: #a8431f; --gold: #d99b2b; --glow: #f6d27a; }
.pal-night { --bg: #0b1526; --ink: #e6ecf4; --accent: #5d7398; --gold: #ffd66b; --glow: #fff2c2; }

.pixel-char { display: block; width: 160px; height: auto; overflow: visible; image-rendering: pixelated; }
.px-K { fill: var(--ink); }
.px-A { fill: var(--accent); }
.px-Y { fill: var(--gold); }
.px-B { fill: var(--bg); }

/* Idle bob, one pixel */
.body { animation: bob 1.4s steps(1, end) infinite; }
.who-scribe .body { animation-duration: 1.8s; }
@keyframes bob {
  0% { transform: translateY(0); }
  50% { transform: translateY(1px); }
  100% { transform: translateY(0); }
}

/* Blink: ink lids close over the eyes briefly */
.lid { fill: var(--ink); opacity: 0; animation: blink 3.6s steps(1, end) infinite; }
.who-scribe .lid { animation-delay: 1.2s; }
@keyframes blink {
  0% { opacity: 0; }
  93% { opacity: 1; }
  97%, 100% { opacity: 0; }
}

/* Mage: orb glows, sparkles pop around it */
.who-mage .px-Y { animation: orb 0.9s steps(1, end) infinite; }
@keyframes orb {
  0% { fill: var(--gold); }
  50% { fill: var(--glow); }
  100% { fill: var(--gold); }
}
.spark { fill: var(--glow); opacity: 0; animation: spark 1.2s steps(1, end) infinite; }
@keyframes spark {
  0% { opacity: 0; }
  60% { opacity: 1; }
  80%, 100% { opacity: 0; }
}

/* Scribe: pen scribbles side to side */
.pen { animation: scribble 0.35s steps(1, end) infinite; }
@keyframes scribble {
  0% { transform: translate(0, 0); }
  50% { transform: translate(-1px, 0); }
  100% { transform: translate(0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .pixel-char * { animation: none !important; }
}
</style>

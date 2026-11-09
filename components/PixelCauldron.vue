<!--
  PixelCauldron.vue — Caldero 20x16 con burbujas y chispas volátiles (Etapa 2).
  Ancho en múltiplos de 20px: 80, 100, 120...

    <PixelCauldron style="width: 100px" />
-->
<script setup>
const GRID = [
  '....................',
  '....................',
  '....................',
  '..KKKKKKKKKKKKKKKK..',
  '.KRRRRRRYRRRRRRRRRK.',
  '.KKKKKKKKKKKKKKKKKK.',
  '..KIIIIIIIIIIIIIIK..',
  '.KIIOIIIIIIIIIIIIIK.',
  '.KIIOIIIIIIIIIIIIIK.',
  '.KIIIIIIIIIIIIIIIIK.',
  '..KIIIIIIIIIIIIIIK..',
  '...KIIIIIIIIIIIIK...',
  '....KKKKKKKKKKKK....',
  '....K..........K....',
  '...KK..........KK...',
  '....................',
]
const COLORS = { K: 'var(--ink)', R: 'var(--vermilion)', Y: 'var(--gold)', I: 'var(--iron)', O: 'var(--oxblood)' }

const runs = []
GRID.forEach((row, y) => {
  let x = 0
  while (x < row.length) {
    const ch = row[x]
    let e = x
    while (e + 1 < row.length && row[e + 1] === ch) e++
    if (ch !== '.') runs.push({ x, y, w: e - x + 1, ch })
    x = e + 1
  }
})

// [x, y, color, delay]
const BUBBLES = [[5, 2, 'gold', 0], [9, 1, 'vermilion', 0.3], [13, 2, 'gold', 0.6], [15, 1, 'crimson', 0.9]]
const SPARKS = [[3, 0, 'crimson', 0.2], [17, 0, 'vermilion', 0.7], [11, 0, 'crimson', 1.1]]
</script>

<template>
  <svg viewBox="0 0 20 16" class="cauldron" shape-rendering="crispEdges" aria-hidden="true">
    <rect v-for="(r, i) in runs" :key="i" :x="r.x" :y="r.y" :width="r.w" height="1" :fill="COLORS[r.ch]" />
    <rect v-for="(b, i) in BUBBLES" :key="`b${i}`" class="bubble" :x="b[0]" :y="b[1]" width="1" height="1"
      :fill="`var(--${b[2]})`" :style="{ animationDelay: `${b[3]}s` }" />
    <rect v-for="(s, i) in SPARKS" :key="`s${i}`" class="spark" :x="s[0]" :y="s[1]" width="1" height="1"
      :fill="`var(--${s[2]})`" :style="{ animationDelay: `${s[3]}s` }" />
  </svg>
</template>

<style scoped>
.cauldron { display: block; width: 100px; height: auto; overflow: visible; }

.bubble { animation: rise 1.2s steps(1, end) infinite; }
@keyframes rise {
  0% { opacity: 0; transform: translateY(1px); }
  30% { opacity: 1; transform: translateY(0); }
  60% { opacity: 1; transform: translateY(-1px); }
  90%, 100% { opacity: 0; }
}

.spark { opacity: 0; animation: pop 1.4s steps(1, end) infinite; }
@keyframes pop {
  0% { opacity: 0; transform: translate(0, 0); }
  40% { opacity: 1; transform: translate(-1px, -1px); }
  70% { opacity: 1; transform: translate(1px, -2px); }
  85%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .cauldron * { animation: none !important; }
  .bubble, .spark { opacity: 1; }
}
</style>

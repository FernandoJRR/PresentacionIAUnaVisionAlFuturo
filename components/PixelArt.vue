<!--
  PixelArt.vue — Renderiza una matriz ASCII como SVG RLE (mismo patrón que PixelCharacter).

    <PixelArt :grid="['.KK.', 'KYYK']" :scale="4" />

  Caracteres por defecto: K ink · C crimson · O oxblood · R vermilion · Y gold
  V vellum · S sage · I iron · B card · M muted. `colors` los sobreescribe.
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  grid: { type: Array, required: true },
  scale: { type: Number, default: 4 },
  colors: { type: Object, default: () => ({}) },
})

const PALETTE = {
  K: 'var(--ink)',
  C: 'var(--crimson)',
  O: 'var(--oxblood)',
  R: 'var(--vermilion)',
  Y: 'var(--gold)',
  V: 'var(--vellum)',
  S: 'var(--sage)',
  I: 'var(--iron)',
  B: 'var(--card)',
  M: 'var(--muted)',
}

const w = computed(() => props.grid[0]?.length ?? 0)
const h = computed(() => props.grid.length)
const fill = computed(() => ({ ...PALETTE, ...props.colors }))

const runs = computed(() => {
  const out = []
  props.grid.forEach((row, y) => {
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
})
</script>

<template>
  <svg
    :viewBox="`0 0 ${w} ${h}`"
    :width="w * scale"
    :height="h * scale"
    shape-rendering="crispEdges"
    aria-hidden="true"
    class="pixel-art"
  >
    <rect v-for="(r, i) in runs" :key="i" :x="r.x" :y="r.y" :width="r.w" height="1" :fill="fill[r.ch]" />
  </svg>
</template>

<style scoped>
.pixel-art { display: block; image-rendering: pixelated; }
</style>

<!--
  PixelNet.vue — Red neuronal en píxeles con propagación hacia adelante (oro) y hacia atrás (carmesí).

    <PixelNet :layers="[3, 4, 1]" :fwd="1" :back="null" />

  fwd:  última capa encendida hacia adelante (-1 = ninguna).
  back: capa más baja alcanzada por el error (null = sin retropropagación).
-->
<script setup>
import { computed } from 'vue'
import { line } from '../utils/pixel'

const props = defineProps({
  layers: { type: Array, default: () => [3, 4, 1] },
  fwd: { type: Number, default: -1 },
  back: { type: Number, default: null },
  hot: { type: String, default: 'var(--gold)' },
})

const W = 40
const H = 30

const nodes = computed(() => props.layers.map((n, li) => {
  const x = Math.round(4 + li * (W - 8) / (props.layers.length - 1))
  return Array.from({ length: n }, (_, k) => ({ x, y: Math.round((k + 1) * H / (n + 1)) }))
}))

const edges = computed(() => {
  const out = []
  nodes.value.slice(0, -1).forEach((col, li) => {
    const lit = props.back != null && props.back <= li ? 'var(--crimson)' : props.fwd > li ? props.hot : 'var(--vellum)'
    col.forEach(a => nodes.value[li + 1].forEach(b => {
      line(a.x, a.y, b.x, b.y).forEach(([x, y]) => out.push({ x, y, c: lit }))
    }))
  })
  return out
})

const nodeFill = li => (props.back != null && props.back <= li ? 'var(--crimson)' : props.fwd >= li ? props.hot : 'var(--card)')
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" class="pixel-net" shape-rendering="crispEdges" aria-hidden="true">
    <rect v-for="(e, i) in edges" :key="i" :x="e.x" :y="e.y" width="1" height="1" :fill="e.c" />
    <template v-for="(col, li) in nodes" :key="li">
      <g v-for="(n, k) in col" :key="k">
        <rect :x="n.x - 2" :y="n.y - 2" width="5" height="5" fill="var(--ink)" />
        <rect :x="n.x - 1" :y="n.y - 1" width="3" height="3" :fill="nodeFill(li)" />
      </g>
    </template>
  </svg>
</template>

<style scoped>
.pixel-net { display: block; width: 240px; height: 180px; }
</style>

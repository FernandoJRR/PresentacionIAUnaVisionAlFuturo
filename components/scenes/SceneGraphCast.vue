<!--
  SceneGraphCast.vue — Pronóstico global con redes de grafos (Lam et al., 2023).
  Estado actual → paso de mensajes en una malla → el sistema avanza en pasos de 6 h. Mapa ilustrativo.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { heat } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'

const W = 24
const H = 12
const LAND = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_, x) =>
  (x > 3 && x < 9 && y > 1 && y < 7) || (x > 7 && x < 11 && y >= 6 && y < 10) || (x > 15 && x < 21 && y > 2 && y < 10)))

function field(step) {
  const cx = 2 + step * 1.6
  const cy = 9 - step * 0.5
  return LAND.map((row, y) => row.map((land, x) => {
    const v = Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / 6)
    return v > 0.2 ? heat(v) : land ? 'var(--sage)' : 'var(--page)'
  }))
}

const MESH = Array.from({ length: 15 }, (_, i) => ({ x: 4 + (i % 5) * 10, y: 4 + Math.floor(i / 5) * 10 }))
const STEPS = 8

const frame = useFrameLoop(STEPS + 3, 550)
const step = computed(() => Math.min(STEPS, frame.value + 1))
const now = field(0)
const forecast = computed(() => field(step.value))
const wave = computed(() => frame.value % 5)
</script>

<template>
  <IoPanels :notes="['estado actual', 'paso de mensajes en malla', 'pronóstico']">
    <template #input>
      <svg :viewBox="`0 0 ${W} ${H}`" class="map" shape-rendering="crispEdges" aria-hidden="true">
        <template v-for="(row, y) in now" :key="y">
          <rect v-for="(c, x) in row" :key="x" :x="x" :y="y" width="1" height="1" :fill="c" />
        </template>
      </svg>
    </template>

    <template #model>
      <svg viewBox="0 0 48 28" class="mesh" shape-rendering="crispEdges" aria-hidden="true">
        <template v-for="(n, i) in MESH" :key="i">
          <rect v-if="i % 5 < 4" :x="n.x + 2" :y="n.y" width="8" height="1" fill="var(--vellum)" />
          <rect v-if="i < 10" :x="n.x" :y="n.y + 2" width="1" height="8" fill="var(--vellum)" />
          <rect :x="n.x - 1" :y="n.y - 1" width="3" height="3"
            :fill="i % 5 === wave ? 'var(--crimson)' : 'var(--ink)'" />
        </template>
      </svg>
    </template>

    <template #output>
      <div class="fc">
        <svg :viewBox="`0 0 ${W} ${H}`" class="map" shape-rendering="crispEdges" aria-hidden="true">
          <template v-for="(row, y) in forecast" :key="y">
            <rect v-for="(c, x) in row" :key="x" :x="x" :y="y" width="1" height="1" :fill="c" />
          </template>
        </svg>
        <span class="t">+{{ step * 6 }} h</span>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.map { width: 168px; height: 84px; box-shadow: 0 0 0 2px var(--ink); }
.mesh { width: 288px; height: 168px; }
.fc { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.t { font-family: 'VT323', monospace; font-size: 28px; color: var(--oxblood); }
</style>

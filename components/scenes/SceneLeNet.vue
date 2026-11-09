<!--
  SceneLeNet.vue — Lectura de cheques (LeCun et al., 1998).
  Filtros 3x3 recorren el dígito; los mapas de características y el max-pooling se calculan de verdad.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'
import PixelArt from '../PixelArt.vue'

const DIGIT = [
  '............',
  '.KKKKKKKKK..',
  '.KKKKKKKKKK.',
  '.........KK.',
  '........KK..',
  '.......KK...',
  '......KKK...',
  '......KK....',
  '.....KK.....',
  '.....KK.....',
  '....KK......',
  '....KK......',
]
const PX = DIGIT.map(r => [...r].map(c => (c === 'K' ? 1 : 0)))

// Horizontal, vertical and both diagonals
const KERNELS = [
  [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
  [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
  [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
  [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
]

const conv = k => Array.from({ length: 10 }, (_, y) => Array.from({ length: 10 }, (_, x) => {
  let s = 0
  for (let j = 0; j < 3; j++)
    for (let i = 0; i < 3; i++) s += k[j][i] * PX[y + j][x + i]
  return s
}))
const pool = m => Array.from({ length: 5 }, (_, y) => Array.from({ length: 5 }, (_, x) =>
  Math.max(m[2 * y][2 * x], m[2 * y][2 * x + 1], m[2 * y + 1][2 * x], m[2 * y + 1][2 * x + 1])))
const toGrid = (m, rows = m.length) => m.map((r, y) =>
  r.map(v => (y >= rows ? '.' : v >= 3 ? 'K' : v === 2 ? 'Y' : 'V')).join(''))

const MAPS = KERNELS.map(conv)
const POOLED = MAPS.map(pool)

const PROBS = [0.01, 0.02, 0.03, 0.04, 0.01, 0.02, 0.01, 0.82, 0.02, 0.02]
const SWEEP = [[1, 0], [5, 0], [8, 1], [6, 4], [4, 7], [3, 9]]

const frame = useFrameLoop(16, 450)

const kernel = computed(() => (frame.value < SWEEP.length ? SWEEP[frame.value] : null))
const rows = computed(() => (frame.value >= SWEEP.length ? 10 : Math.round((frame.value + 1) * 10 / SWEEP.length)))
const c1 = computed(() => MAPS.map(m => toGrid(m, rows.value)))
const s2 = computed(() => (frame.value >= 7 ? POOLED.map(m => toGrid(m)) : null))
const dense = computed(() => frame.value >= 9)
const grow = computed(() => Math.min(1, Math.max(0, (frame.value - 9) / 3)))
const bars = computed(() => PROBS.map(p => Math.max(1, Math.round(p * 25 * grow.value))))
const answer = computed(() => frame.value >= 12)
</script>

<template>
  <IoPanels :notes="['píxeles', 'convoluciones', 'dígito']">
    <template #input>
      <svg viewBox="0 0 12 12" class="digit" shape-rendering="crispEdges" aria-hidden="true">
        <rect width="12" height="12" fill="var(--card)" />
        <template v-for="(row, y) in DIGIT" :key="y">
          <rect v-for="(c, x) in row" v-show="c === 'K'" :key="x" :x="x" :y="y" width="1" height="1" fill="var(--ink)" />
        </template>
        <rect v-if="kernel" :x="kernel[0] + 0.1" :y="kernel[1] + 0.1" width="2.8" height="2.8"
          fill="var(--gold)" fill-opacity="0.35" stroke="var(--crimson)" stroke-width="0.2" />
      </svg>
    </template>

    <template #model>
      <div class="net">
        <div class="c1">
          <PixelArt v-for="(g, i) in c1" :key="i" :grid="g" :scale="6" class="fmap" />
        </div>
        <div class="s2">
          <template v-if="s2">
            <PixelArt v-for="(g, i) in s2" :key="i" :grid="g" :scale="6" class="fmap pop" />
          </template>
        </div>
        <div class="fc">
          <span v-for="n in 10" :key="n" class="neuron" :class="{ on: dense, hit: dense && n === 8 }" />
        </div>
      </div>
    </template>

    <template #output>
      <div class="out">
        <span class="answer" :class="{ show: answer }">7</span>
        <svg viewBox="0 0 40 25" class="bars" shape-rendering="crispEdges" aria-hidden="true">
          <rect v-for="(h, i) in bars" :key="i" :x="i * 4" :y="25 - h" width="3" :height="h"
            :fill="i === 7 ? 'var(--crimson)' : 'var(--vellum)'" />
        </svg>
        <div class="ticks"><span v-for="d in 10" :key="d">{{ d - 1 }}</span></div>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.digit { width: 156px; height: 156px; box-shadow: 0 0 0 2px var(--vellum); }

.net { display: flex; align-items: center; gap: 24px; }
.c1 { display: grid; grid-template-columns: repeat(2, 60px); gap: 8px; }
.s2 { display: flex; flex-direction: column; gap: 6px; width: 30px; min-height: 138px; }
.fmap { box-shadow: 0 0 0 1px var(--border); background: var(--card); }
.fc { display: flex; flex-direction: column; gap: 4px; }
.neuron { width: 10px; height: 10px; background: var(--card); box-shadow: 0 0 0 2px var(--vellum); }
.neuron.on { box-shadow: 0 0 0 2px var(--ink); }
.neuron.hit { background: var(--gold); }

.pop { animation: pop 0.3s steps(1, end) both; }
@keyframes pop {
  0% { opacity: 0; transform: translateY(2px); }
  50% { opacity: 1; transform: translateY(1px); }
  100% { opacity: 1; transform: translateY(0); }
}

.out { display: flex; flex-direction: column; align-items: center; }
.answer {
  font-family: 'VT323', monospace;
  font-size: 64px;
  line-height: 0.9;
  color: var(--crimson);
  text-shadow: 3px 3px 0 var(--vellum);
  visibility: hidden;
}
.answer.show { visibility: visible; }
.bars { width: 160px; height: 100px; }
.ticks { display: flex; width: 160px; }
.ticks span { width: 16px; font-family: 'VT323', monospace; font-size: 16px; color: var(--muted); text-align: left; padding-left: 2px; }

@media (prefers-reduced-motion: reduce) {
  .pop { animation: none; }
}
</style>

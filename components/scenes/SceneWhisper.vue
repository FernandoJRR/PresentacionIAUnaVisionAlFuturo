<!--
  SceneWhisper.vue — Reconocimiento de voz robusto (Radford et al., 2023).
  Audio → espectrograma log-Mel (revelado por columnas) → transformer → texto.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { heat, seeded } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'

const COLS = 24
const ROWS = 12
const WORDS = ['Hola,', '¿me', 'escuchas?']
// Word segments over columns with two energy bands each
const SEGS = [[1, 6, [3, 8]], [8, 12, [2, 6]], [14, 22, [4, 9]]]
const rand = seeded(11)
const SPEC = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) => {
  const seg = SEGS.find(([a, b]) => x >= a && x <= b)
  const band = seg && seg[2].some(r => Math.abs(y - r) <= 1)
  return seg ? (band ? 0.6 + rand() * 0.4 : rand() * 0.45) : rand() * 0.15
}))
const WAVE = Array.from({ length: 40 }, (_, x) => {
  const col = Math.floor(x * COLS / 40)
  const loud = SEGS.some(([a, b]) => col >= a && col <= b)
  return loud ? 1 + Math.round(rand() * 4) : Math.round(rand())
})

const REVEAL = 6
const frame = useFrameLoop(REVEAL + WORDS.length + 3, 450)
const shown = computed(() => Math.min(COLS, Math.round((frame.value + 1) * COLS / REVEAL)))
const words = computed(() => Math.max(0, Math.min(WORDS.length, frame.value - REVEAL + 1)))
const head = computed(() => Math.min(39, Math.round(shown.value * 40 / COLS)))
</script>

<template>
  <IoPanels :notes="['audio', 'espectrograma + transformer', 'transcripción']">
    <template #input>
      <svg viewBox="0 0 40 12" class="wave" shape-rendering="crispEdges" aria-hidden="true">
        <rect v-for="(h, x) in WAVE" :key="x" :x="x" :y="6 - h" width="1" :height="h * 2 + 1"
          :fill="x <= head ? 'var(--ink)' : 'var(--vellum)'" />
        <rect :x="head" y="0" width="1" height="12" fill="var(--crimson)" />
      </svg>
    </template>

    <template #model>
      <div class="pipe">
        <svg :viewBox="`0 0 ${COLS} ${ROWS}`" class="spec" shape-rendering="crispEdges" aria-hidden="true">
          <template v-for="(row, y) in SPEC" :key="y">
            <rect v-for="(v, x) in row" :key="x" :x="x" :y="ROWS - 1 - y" width="1" height="1"
              :fill="x < shown ? heat(v) : 'var(--page)'" />
          </template>
        </svg>
        <div class="tf">
          <span v-for="n in 3" :key="n" :class="{ on: words >= 1 }" />
        </div>
      </div>
    </template>

    <template #output>
      <div class="text">
        <span v-for="(w, i) in WORDS" :key="w" :class="{ show: i < words }">{{ w }} </span><span class="cursor" />
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.wave { width: 200px; height: 60px; }
.pipe { display: flex; align-items: center; gap: 20px; }
.spec { width: 192px; height: 96px; box-shadow: 0 0 0 2px var(--ink); }
.tf { display: flex; flex-direction: column; gap: 6px; }
.tf span { width: 48px; height: 22px; background: var(--page); box-shadow: 0 0 0 2px var(--vellum); }
.tf span.on { background: var(--crimson); box-shadow: 0 0 0 2px var(--ink); }

.text { font-family: 'IBM Plex Mono', monospace; font-size: 18px; line-height: 1.5; padding: 8px 10px; background: var(--page); box-shadow: 0 0 0 2px var(--ink); min-height: 96px; width: 100%; }
.text span { margin-right: 0.5em; visibility: hidden; color: var(--crimson); font-weight: 700; }
.text span.show { visibility: visible; }
.cursor { visibility: visible !important; display: inline-block; width: 8px; height: 16px; vertical-align: -2px; background: var(--ink); animation: blink 0.8s steps(1, end) infinite; }
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .cursor { animation: none; } }
</style>

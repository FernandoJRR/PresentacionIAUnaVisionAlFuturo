<!--
  SceneDectalk.vue — Síntesis por formantes (Klatt, 1987).
  Texto → fonemas → tres formantes (F1–F3) → onda sonora. Frecuencias aproximadas del español.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'

// Hz, approximate
const PHONES = [
  { p: 'o', f: [500, 900, 2400] },
  { p: 'l', f: [350, 1100, 2600] },
  { p: 'a', f: [750, 1250, 2500] },
]
const PER = 3

const frame = useFrameLoop(PHONES.length * PER + 3, 420)
const idx = computed(() => Math.min(PHONES.length - 1, Math.floor(frame.value / PER)))
const bars = computed(() => PHONES[idx.value].f.map(hz => Math.round(hz / 3000 * 20)))

// Sum of three sines per phoneme, quantized to 9 rows, scrolled by frame
const wave = computed(() => {
  const f = PHONES[idx.value].f
  return Array.from({ length: 40 }, (_, x) => {
    const t = (x + frame.value * 3) / 40
    const v = f.reduce((s, hz, k) => s + Math.sin(t * hz / 60) / (k + 1), 0) / 1.8
    return Math.round(4 + v * 4)
  })
})
</script>

<template>
  <IoPanels :notes="['texto', 'fonemas → formantes', 'onda sonora']">
    <template #input>
      <div class="text">hola</div>
    </template>

    <template #model>
      <div class="synth">
        <div class="phones">
          <span v-for="(ph, i) in PHONES" :key="ph.p" class="ph" :class="{ cur: i === idx, done: i < idx }">/{{ ph.p }}/</span>
        </div>
        <svg viewBox="0 0 22 22" class="formants" shape-rendering="crispEdges" aria-hidden="true">
          <rect x="0" y="21" width="22" height="1" fill="var(--ink)" />
          <rect v-for="(h, i) in bars" :key="i" :x="2 + i * 7" :y="21 - h" width="4" :height="h"
            :fill="['var(--crimson)', 'var(--vermilion)', 'var(--gold)'][i]" />
        </svg>
        <div class="flabels"><span>F1</span><span>F2</span><span>F3</span></div>
      </div>
    </template>

    <template #output>
      <svg viewBox="0 0 40 9" class="wave" shape-rendering="crispEdges" aria-hidden="true">
        <rect x="0" y="4" width="40" height="1" fill="var(--vellum)" />
        <rect v-for="(y, x) in wave" :key="x" :x="x" :y="Math.min(y, 4)" width="1" :height="Math.abs(y - 4) + 1" fill="var(--ink)" />
      </svg>
    </template>
  </IoPanels>
</template>

<style scoped>
.text { font-family: 'IBM Plex Mono', monospace; font-size: 34px; padding: 6px 18px; background: var(--page); box-shadow: 0 0 0 2px var(--ink); }

.synth { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.phones { display: flex; gap: 10px; }
.ph {
  padding: 0 10px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 18px;
  color: var(--muted);
  box-shadow: 0 0 0 2px var(--vellum);
}
.ph.done { color: var(--ink); box-shadow: 0 0 0 2px var(--ink); }
.ph.cur { color: var(--card); background: var(--crimson); box-shadow: 0 0 0 2px var(--ink); }
.formants { width: 132px; height: 132px; }
.flabels { display: flex; gap: 18px; padding-left: 4px; font-family: 'VT323', monospace; font-size: 18px; color: var(--muted); }

.wave { width: 200px; height: 45px; }
</style>

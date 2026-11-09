<!--
  SceneBackprop.vue — Retropropagación (Rumelhart, Hinton & Williams, 1986).
  Pasada hacia adelante (oro), error hacia atrás (carmesí); el error baja en cada iteración.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'
import PixelNet from '../PixelNet.vue'

const ERRORS = [0.8, 0.52, 0.31, 0.17, 0.08, 0.04]
const PER_IT = 6

const frame = useFrameLoop(ERRORS.length * PER_IT, 350)
const it = computed(() => Math.floor(frame.value / PER_IT))
const phase = computed(() => frame.value % PER_IT)
const fwd = computed(() => (phase.value <= 2 ? phase.value : 2))
const back = computed(() => (phase.value === 3 ? 1 : phase.value >= 4 ? 0 : null))
const err = computed(() => ERRORS[it.value])
const pred = computed(() => 1 - err.value)
const bars = computed(() => ERRORS.slice(0, it.value + 1).map(e => Math.max(1, Math.round(e * 20))))
</script>

<template>
  <IoPanels :notes="['predicción vs objetivo', 'retropropagación', 'error por iteración']">
    <template #input>
      <div class="cmp">
        <div class="row">
          <span class="k">predicción</span>
          <span class="bar"><i :style="{ width: `${Math.round(pred * 20) * 6}px` }" /></span>
          <span class="n">{{ pred.toFixed(2) }}</span>
        </div>
        <div class="row">
          <span class="k">objetivo</span>
          <span class="bar"><i class="target" style="width: 120px" /></span>
          <span class="n">1.00</span>
        </div>
        <div class="err">error {{ err.toFixed(2) }}</div>
      </div>
    </template>

    <template #model>
      <PixelNet :layers="[2, 3, 1]" :fwd="fwd" :back="back" />
    </template>

    <template #output>
      <svg viewBox="0 0 26 22" class="curve" shape-rendering="crispEdges" aria-hidden="true">
        <rect x="0" y="0" width="1" height="21" fill="var(--ink)" />
        <rect x="0" y="21" width="26" height="1" fill="var(--ink)" />
        <rect v-for="(h, i) in bars" :key="i" :x="2 + i * 4" :y="21 - h" width="3" :height="h"
          :fill="i === it ? 'var(--crimson)' : 'var(--vellum)'" />
      </svg>
    </template>
  </IoPanels>
</template>

<style scoped>
.cmp { display: flex; flex-direction: column; gap: 10px; }
.row { display: grid; grid-template-columns: 1fr; gap: 2px; }
.k { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--muted); }
.bar { width: 120px; height: 12px; background: var(--vellum); }
.bar i { display: block; height: 100%; background: var(--gold); }
.bar i.target { background: var(--sage); }
.n { font-family: 'VT323', monospace; font-size: 20px; line-height: 1; }
.err { font-family: 'VT323', monospace; font-size: 24px; color: var(--crimson); }
.curve { width: 156px; height: 132px; }
</style>

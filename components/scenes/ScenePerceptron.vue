<!--
  ScenePerceptron.vue — Perceptrón (Rosenblatt, 1958).
  Suma ponderada de entradas binarias y función escalón con umbral θ.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'
import PixelArt from '../PixelArt.vue'

const W = [0.6, 0.4, -0.5]
const THETA = 0.5
const PATTERNS = [[1, 0, 0], [0, 1, 0], [1, 1, 1], [0, 1, 1]]
const STEP_FN = [
  '.........KKKKK',
  '.........K....',
  '.........K....',
  '.........K....',
  '.........K....',
  'KKKKKKKKKK....',
]

const frame = useFrameLoop(PATTERNS.length * 3, 650)
const idx = computed(() => Math.floor(frame.value / 3))
const phase = computed(() => frame.value % 3)
const x = computed(() => PATTERNS[idx.value])
const sum = computed(() => x.value.reduce((s, v, i) => s + v * W[i], 0))
const out = computed(() => (sum.value >= THETA ? 1 : 0))
const fmt = v => (Math.round(v * 10) / 10).toFixed(1)
</script>

<template>
  <IoPanels :notes="['entradas', 'suma ponderada + umbral', 'decisión']">
    <template #input>
      <div class="inputs">
        <div v-for="(v, i) in x" :key="i" class="in">
          <span class="lamp" :class="{ on: v }" />
          <span class="var">x<sub>{{ i + 1 }}</sub> = {{ v }}</span>
        </div>
      </div>
    </template>

    <template #model>
      <div class="neuron">
        <div class="weights">
          <span v-for="(w, i) in W" :key="i" class="w" :class="{ on: x[i] }">× {{ w.toFixed(1) }}</span>
        </div>
        <div class="sigma" :class="{ on: phase >= 1 }">
          <span class="s">Σ</span>
          <span class="v">{{ phase >= 1 ? fmt(sum) : '·' }}</span>
        </div>
        <div class="step">
          <PixelArt :grid="STEP_FN" :scale="6" />
          <span class="theta">θ = {{ THETA }}</span>
        </div>
      </div>
    </template>

    <template #output>
      <div class="result">
        <span class="bulb" :class="{ on: phase === 2 && out }">{{ phase === 2 ? out : '·' }}</span>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.inputs { display: flex; flex-direction: column; gap: 14px; }
.in { display: flex; align-items: center; gap: 12px; }
.lamp { width: 24px; height: 24px; background: var(--card); box-shadow: 0 0 0 2px var(--ink); }
.lamp.on { background: var(--gold); }
.var { font-family: 'IBM Plex Mono', monospace; font-size: 16px; }

.neuron { display: flex; align-items: center; gap: 22px; }
.weights { display: flex; flex-direction: column; gap: 18px; }
.w {
  padding: 1px 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  color: var(--muted);
  box-shadow: 0 0 0 2px var(--vellum);
}
.w.on { color: var(--ink); box-shadow: 0 0 0 2px var(--gold); }
.sigma {
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--page);
  box-shadow: 0 0 0 3px var(--ink);
}
.sigma.on { background: var(--card); box-shadow: 0 0 0 3px var(--ink), inset 0 0 0 3px var(--gold); }
.s { font-family: 'VT323', monospace; font-size: 30px; line-height: 0.8; color: var(--oxblood); }
.v { font-family: 'VT323', monospace; font-size: 22px; }
.step { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.theta { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--muted); }

.bulb {
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'VT323', monospace;
  font-size: 56px;
  color: var(--muted);
  background: var(--page);
  box-shadow: 0 0 0 3px var(--ink);
}
.bulb.on { color: var(--card); background: var(--crimson); box-shadow: 0 0 0 3px var(--ink), 4px 4px 0 3px var(--gold); }
</style>

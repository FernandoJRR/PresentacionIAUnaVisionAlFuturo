<!--
  SceneDelegarAprendizaje.vue — Slide M-01b.
  Dos carriles: la IA que responde (copiar) vs. la IA que guía (escribir); barras de práctica y examen sin IA.
  Datos: Bastani et al. (PNAS, 2025), cambio relativo frente al grupo de control.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import PixelArt from '../PixelArt.vue'
import PixelCharacter from '../PixelCharacter.vue'

const LANES = [
  { key: 'base', name: 'IA que responde', verb: 'Copia la solución', practice: 48, exam: -17, tone: 'var(--crimson)' },
  { key: 'tutor', name: 'IA que guía', verb: 'Escribe la solución', practice: 127, exam: 0, tone: 'var(--sage)' },
]

const PX_PER_PCT = 0.8
const snap = v => Math.round(v / 4) * 4

const CHAT = [
  'KKKKKKKKKK',
  'KBBBBBBBBK',
  'KBMMMMMMBK',
  'KBBBBBBBBK',
  'KBMMMMBBBK',
  'KBBBBBBBBK',
  'KKKKBKKKKK',
  '...KK.....',
]

const frame = useFrameLoop(14, 380)
const practiceT = computed(() => Math.min(1, (frame.value + 1) / 6))
const examT = computed(() => (frame.value < 7 ? 0 : Math.min(1, (frame.value - 6) / 4)))

// Cuaderno: el carril tutor llena líneas, el carril base queda vacío
const notebookLines = computed(() => Math.min(4, Math.floor(frame.value / 3)))

function bar(v, t) {
  const h = snap(Math.abs(v) * PX_PER_PCT * t)
  return { height: `${Math.max(h, v === 0 && t > 0 ? 4 : 0)}px` }
}
const fmt = v => (v === 0 ? '≈ 0%' : `${v > 0 ? '+' : '−'}${Math.abs(v)}%`)
</script>

<template>
  <div class="learn-scene">
    <div v-for="l in LANES" :key="l.key" class="lane" :class="l.key" :style="{ '--tone': l.tone }">
      <div class="lane-head">
        <span class="label">{{ l.name }}</span>
      </div>

      <div class="lane-body">
        <div class="actor">
          <div class="actor-row">
            <PixelCharacter who="scribe" facing="right" class="a-scribe" />
            <PixelArt v-if="l.key === 'base'" :grid="CHAT" :scale="4" class="a-chat" />
            <div class="notebook" :class="l.key">
              <span
                v-for="i in 4"
                :key="i"
                class="nb-line"
                :class="{ ink: l.key === 'tutor' && i <= notebookLines }"
              />
            </div>
          </div>
          <span class="verb">{{ l.verb }}</span>
        </div>

        <div class="chart" aria-hidden="true">
          <div class="col">
            <span class="val">{{ practiceT === 1 ? fmt(l.practice) : '' }}</span>
            <div class="pos"><span class="bar up" :style="bar(l.practice, practiceT)" /></div>
            <div class="neg" />
            <span class="col-lbl">Práctica</span>
          </div>
          <div class="col">
            <span class="val">{{ examT === 1 ? (l.exam >= 0 ? fmt(l.exam) : '') : '' }}</span>
            <div class="pos"><span v-if="l.exam >= 0" class="bar up" :style="bar(l.exam, examT)" /></div>
            <div class="neg">
              <span v-if="l.exam < 0" class="bar down" :style="bar(l.exam, examT)" />
              <span v-if="l.exam < 0 && examT === 1" class="val neg-val">{{ fmt(l.exam) }}</span>
            </div>
            <span class="col-lbl">Examen sin IA</span>
          </div>
        </div>
      </div>
    </div>

    <p class="source">Cambio frente al grupo de control · ~1 000 estudiantes · Bastani et al., PNAS 2025</p>
  </div>
</template>

<style scoped>
.learn-scene {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.lane {
  display: flex;
  flex-direction: column;
  background: var(--card);
  box-shadow: 0 0 0 3px var(--tone), 4px 4px 0 3px var(--vellum);
  padding: 10px 12px;
}

.lane-head {
  border-bottom: 2px dashed var(--vellum);
  padding-bottom: 4px;
}

.lane-head .label {
  font-size: 11px;
  color: var(--tone);
}

.lane.tutor .lane-head .label {
  color: var(--ink);
}

.lane-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: end;
  padding-top: 8px;
}

.actor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.actor-row {
  display: flex;
  align-items: flex-end;
  gap: 6px;
}

.a-scribe {
  width: 64px;
}

.a-chat {
  margin-bottom: 44px;
}

.notebook {
  width: 44px;
  height: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 0 6px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}

.nb-line {
  height: 4px;
  background: var(--vellum);
}

.nb-line.ink {
  background: var(--ink);
}

.verb {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--ink);
}

.chart {
  display: flex;
  justify-content: center;
  gap: 18px;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
}

.val {
  height: 22px;
  font-family: 'VT323', monospace;
  font-size: 22px;
  line-height: 22px;
  color: var(--ink);
}

.pos {
  height: 104px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 2px solid var(--ink);
}

.neg {
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 32px;
  box-shadow: 0 0 0 2px var(--ink);
}

.bar.up {
  background: var(--tone);
}

.bar.down {
  background: var(--crimson);
  background-image: repeating-conic-gradient(var(--crimson) 0 25%, var(--oxblood) 0 50%);
  background-size: 4px 4px;
}

.neg-val {
  color: var(--crimson);
}

.col-lbl {
  font-family: 'Silkscreen', monospace;
  font-size: 8px;
  text-transform: uppercase;
  color: var(--muted);
  text-align: center;
}

.source {
  grid-column: 1 / -1;
  margin: 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--muted);
  text-align: center;
}
</style>

<!--
  SceneModeloMental.vue — Slide M-02.
  Izquierda: el texto que produce la IA. Derecha: la máquina nocional que el estudiante ejecuta en su cabeza
  (traza de variables paso a paso).
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import PixelCharacter from '../PixelCharacter.vue'

const CODE = [
  'total = 0',
  'for i in range(1, 4):',
  '    total = total + i',
  'print(total)',
]

// line: línea activa · i/total: estado de memoria · out: salida
const TRACE = [
  { line: 0, i: '—', total: 0, out: '' },
  { line: 1, i: 1, total: 0, out: '' },
  { line: 2, i: 1, total: 1, out: '' },
  { line: 1, i: 2, total: 1, out: '' },
  { line: 2, i: 2, total: 3, out: '' },
  { line: 1, i: 3, total: 3, out: '' },
  { line: 2, i: 3, total: 6, out: '' },
  { line: 3, i: 3, total: 6, out: '6' },
]

const frame = useFrameLoop(TRACE.length + 2, 700)
const step = computed(() => TRACE[Math.min(frame.value, TRACE.length - 1)])
const prev = computed(() => TRACE[Math.max(0, Math.min(frame.value, TRACE.length - 1) - 1)])
const changed = key => frame.value > 0 && step.value[key] !== prev.value[key]
</script>

<template>
  <div class="mental-scene">
    <div class="panel text-panel">
      <span class="label">Lo que produce la IA</span>
      <div class="code">
        <div v-for="(c, n) in CODE" :key="n" class="code-line" :class="{ on: step.line === n }">
          <span class="caret">{{ step.line === n ? '▶' : '' }}</span>
          <span class="ln">{{ n + 1 }}</span>
          <code>{{ c }}</code>
        </div>
      </div>
      <span class="caption">Texto probable, sin ejecución</span>
    </div>

    <div class="bridge" aria-hidden="true">
      <span v-for="i in 4" :key="i" class="bridge-px" :class="{ lit: (frame + i) % 4 === 0 }" />
    </div>

    <div class="panel model-panel">
      <span class="label">Lo que construyes tú</span>
      <div class="model-body">
        <PixelCharacter who="scribe" facing="right" class="m-scribe" />
        <div class="memory">
          <div class="cell" :class="{ hot: changed('i') }">
            <span class="var">i</span>
            <span class="box">{{ step.i }}</span>
          </div>
          <div class="cell" :class="{ hot: changed('total') }">
            <span class="var">total</span>
            <span class="box">{{ step.total }}</span>
          </div>
          <div class="cell out" :class="{ hot: changed('out') }">
            <span class="var">salida</span>
            <span class="box">{{ step.out }}</span>
          </div>
        </div>
      </div>
      <span class="caption">Estado de la memoria, paso a paso</span>
    </div>

    <p class="source">Máquina nocional: Sorva, ACM TOCE 2013 · Efecto de generación: Slamecka &amp; Graf, 1978</p>
  </div>
</template>

<style scoped>
.mental-scene {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 56px 1fr;
  gap: 10px;
  align-items: stretch;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: var(--card);
}

.text-panel {
  box-shadow: 0 0 0 2px var(--muted), 4px 4px 0 2px var(--vellum);
}

.model-panel {
  box-shadow: 0 0 0 3px var(--gold), 4px 4px 0 3px var(--vellum);
}

.panel .label {
  font-size: 10px;
  color: var(--brick);
}

.code {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  background: var(--page);
  box-shadow: 0 0 0 1px var(--border);
}

.code-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  color: var(--muted);
}

.code-line.on {
  color: var(--ink);
  background: var(--card);
  box-shadow: 0 0 0 2px var(--gold);
}

.caret {
  width: 12px;
  font-size: 11px;
  color: var(--gold);
}

.ln {
  width: 14px;
  font-size: 11px;
  color: var(--vellum);
}

.code-line code {
  white-space: pre;
  font-weight: 700;
}

.caption {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--muted);
}

.bridge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.bridge-px {
  width: 8px;
  height: 8px;
  background: var(--vellum);
}

.bridge-px.lit {
  background: var(--gold);
  box-shadow: 0 0 0 2px var(--ink);
}

.model-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 12px;
}

.m-scribe {
  width: 96px;
}

.memory {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.var {
  width: 52px;
  text-align: right;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--oxblood);
}

.box {
  width: 60px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'VT323', monospace;
  font-size: 28px;
  color: var(--ink);
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}

.cell.hot .box {
  background: var(--gold);
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 var(--vellum);
}

.cell.out .box {
  box-shadow: 0 0 0 2px var(--sage);
}

.cell.out.hot .box {
  background: var(--sage);
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 var(--vellum);
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

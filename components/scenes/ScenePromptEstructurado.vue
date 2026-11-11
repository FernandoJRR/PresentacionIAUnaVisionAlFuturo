<!--
  ScenePromptEstructurado.vue — Slide M-04.
  Prompt vago → salidas dispersas; prompt construido por bloques → una salida acotada y verificable.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'

const VAGUE_OUTPUTS = [
  'App web con login y base de datos',
  'Hoja de cálculo con macros',
  'Programa en Java con interfaz gráfica',
  'Script que lee notas de un PDF',
]

const BLOCKS = [
  { key: 'Contexto', text: 'Curso de Programación I · Python' },
  { key: 'Objetivo', text: 'Promedio de 5 notas enteras' },
  { key: 'Restricción', text: 'Solo bucles · sin librerías' },
  { key: 'Ejemplo', text: '[80, 90] → 85.0' },
  { key: 'Formato', text: 'Explica cada paso antes del código' },
]

const frame = useFrameLoop(BLOCKS.length + 4, 650)
const placed = computed(() => Math.min(BLOCKS.length, frame.value + 1))
const ready = computed(() => frame.value >= BLOCKS.length)
const vague = computed(() => [0, 1, 2].map(i => VAGUE_OUTPUTS[(frame.value + i) % VAGUE_OUTPUTS.length]))
const jitter = i => ((frame.value + i) % 2 === 0 ? -4 : 4)
</script>

<template>
  <div class="prompt-scene">
    <div class="panel vague">
      <span class="label">Prompt sin estructura</span>
      <code class="prompt">"hazme un programa de notas"</code>
      <div class="outs">
        <div
          v-for="(o, i) in vague"
          :key="i"
          class="out bad"
          :style="{ transform: `translateX(${jitter(i)}px)` }"
        >{{ o }}</div>
      </div>
      <span class="caption">La IA rellena cada hueco con una suposición</span>
    </div>

    <div class="panel built">
      <span class="label">Prompt estructurado</span>
      <div class="stack">
        <div v-for="(b, i) in BLOCKS" :key="b.key" class="block" :class="{ on: i < placed }">
          <span class="b-key">{{ b.key }}</span>
          <code>{{ b.text }}</code>
        </div>
      </div>
      <div class="out good" :class="{ show: ready }">Una solución acotada que puedes verificar</div>
    </div>

    <p class="source">Ejemplos en el prompt: Brown et al., NeurIPS 2020 · Razonamiento paso a paso: Wei et al., NeurIPS 2022</p>
  </div>
</template>

<style scoped>
.prompt-scene {
  width: 100%;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 18px;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: var(--card);
}

.panel.vague {
  box-shadow: 0 0 0 3px var(--crimson), 4px 4px 0 3px var(--vellum);
}

.panel.built {
  box-shadow: 0 0 0 3px var(--sage), 4px 4px 0 3px var(--vellum);
}

.panel .label {
  font-size: 10px;
  color: var(--brick);
}

.prompt {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  padding: 8px 10px;
  color: var(--ink);
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}

.outs {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.out {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  background: var(--page);
}

.out.bad {
  color: var(--crimson);
  box-shadow: 0 0 0 2px var(--crimson);
}

.out.good {
  text-align: center;
  color: var(--ink);
  background: var(--sage);
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 var(--vellum);
  visibility: hidden;
}

.out.good.show {
  visibility: visible;
}

.caption {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--muted);
}

.stack {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.block {
  display: grid;
  grid-template-columns: 96px 1fr;
  align-items: center;
  gap: 10px;
  padding: 5px 8px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--vellum);
  opacity: 0.25;
}

.block.on {
  opacity: 1;
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 var(--vellum);
}

.b-key {
  font-family: 'Silkscreen', monospace;
  font-size: 9px;
  text-transform: uppercase;
  color: var(--oxblood);
}

.block code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
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

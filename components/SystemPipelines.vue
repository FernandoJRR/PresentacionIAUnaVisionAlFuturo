<!--
  SystemPipelines.vue — Sistemas actuales como composición de piezas de la línea de tiempo.
  RAG y agente de voz (STT → LLM → TTS); un paquete recorre cada tubería.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../utils/frameLoop'
import PixelCauldron from './PixelCauldron.vue'
import PixelIcon from './PixelIcon.vue'

const ROWS = [
  {
    name: 'RAG',
    offset: 0,
    stages: [
      { icon: 'chat', label: 'Pregunta' },
      { icon: 'search', label: 'Búsqueda' },
      { icon: 'doc', label: 'Documentos' },
      { llm: true, label: 'LLM' },
      { icon: 'check', label: 'Respuesta con fuentes' },
    ],
  },
  {
    name: 'Agente de voz',
    offset: 3,
    stages: [
      { icon: 'mic', label: 'Voz' },
      { icon: 'wave', label: 'STT', tag: '2022' },
      { llm: true, label: 'LLM' },
      { icon: 'speaker', label: 'TTS', tag: '1984 →' },
      { icon: 'phones', label: 'Voz' },
    ],
  },
]
const CYCLE = 6

const frame = useFrameLoop(CYCLE * 2, 500)
const active = row => computed(() => (frame.value + row.offset) % CYCLE)
const actives = ROWS.map(active)
</script>

<template>
  <div class="pipes">
    <div v-for="(row, r) in ROWS" :key="row.name" class="pipe">
      <span class="label name">{{ row.name }}</span>
      <template v-for="(s, i) in row.stages" :key="i">
        <span v-if="i > 0" class="link" :class="{ on: actives[r].value >= i }" />
        <div class="stage" :class="{ on: actives[r].value === i, done: actives[r].value > i }">
          <PixelCauldron v-if="s.llm" class="pot" />
          <PixelIcon v-else :name="s.icon" class="ico" />
          <span class="lab">{{ s.label }}</span>
          <span v-if="s.tag" class="tag">{{ s.tag }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.pipes { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 36px; padding-bottom: 1.5rem; }
.pipe { display: flex; align-items: center; }
.name { width: 132px; flex: none; color: var(--brick); }

.stage {
  position: relative;
  width: 104px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--vellum);
  text-align: center;
}
.stage.done { box-shadow: 0 0 0 2px var(--ink); }
.stage.on { box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--gold); transform: translateY(-2px); }
.ico { width: 32px; height: 32px; color: var(--ink); }
.pot { width: 60px; }
.lab { font-size: 13px; line-height: 1.1; color: var(--ink); padding: 0 4px; }
.tag { position: absolute; top: -18px; right: 0; font-family: 'VT323', monospace; font-size: 18px; color: var(--muted); }

.link { flex: 1; min-width: 16px; height: 4px; background: repeating-linear-gradient(90deg, var(--vellum) 0 6px, transparent 6px 10px); }
.link.on { background: var(--vermilion); }
</style>

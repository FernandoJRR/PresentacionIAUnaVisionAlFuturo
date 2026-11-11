<!--
  SceneDelegarHerramientas.vue — Slide M-01a.
  El escriba delega cálculo, memoria y orientación a tres herramientas; cada entrega libera capacidad.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import PixelArt from '../PixelArt.vue'
import PixelCharacter from '../PixelCharacter.vue'

const TOOLS = [
  {
    name: 'Calculadora',
    task: 'cálculo',
    grid: [
      '.KKKKKKKK.',
      'KBBBBBBBBK',
      'KBSSSSSSBK',
      'KBSSSSKSBK',
      'KBBBBBBBBK',
      'KBYYBYYBRK',
      'KBBBBBBBBK',
      'KBYYBYYBRK',
      'KBBBBBBBBK',
      'KBYYBYYBRK',
      'KBBBBBBBBK',
      '.KKKKKKKK.',
    ],
  },
  {
    name: 'Notas',
    task: 'memoria',
    grid: [
      'KKKKKKK...',
      'KBBBBBKK..',
      'KBBBBBKBK.',
      'KBBBBBKKKK',
      'KBMMMMMMBK',
      'KBBBBBBBBK',
      'KBMMMMMBBK',
      'KBBBBBBBBK',
      'KBMMMMMMBK',
      'KBBBBBBBBK',
      'KBCCCMBBBK',
      'KKKKKKKKKK',
    ],
  },
  {
    name: 'Mapa',
    task: 'orientación',
    grid: [
      '....CCC...',
      '...CCBCC..',
      '...CCCCC..',
      '....CCC...',
      '.....C....',
      'KKKKKKKKKK',
      'KSSKVVKSSK',
      'KSSKVVKSSK',
      'KVVKSSKVVK',
      'KVVKSSKVVK',
      'KSSKVVKSSK',
      'KKKKKKKKKK',
    ],
  },
]

// 4 cuadros por herramienta: viaje del paquete (0-2) y entrega (3)
const PER_TOOL = 4
const frame = useFrameLoop(TOOLS.length * PER_TOOL + 3, 380)

const current = computed(() => Math.min(TOOLS.length - 1, Math.floor(frame.value / PER_TOOL)))
const delivered = computed(() => Math.min(TOOLS.length, Math.floor((frame.value + 1) / PER_TOOL)))
const travelling = computed(() => frame.value < TOOLS.length * PER_TOOL && frame.value % PER_TOOL < PER_TOOL - 1)
const progress = computed(() => (frame.value % PER_TOOL) / (PER_TOOL - 1))

const capacity = computed(() => delivered.value)
</script>

<template>
  <div class="delegate-scene">
    <div class="person-card">
      <span class="label">Atención disponible</span>
      <PixelCharacter who="scribe" facing="right" class="p-scribe" />
      <div class="cap-meter" aria-hidden="true">
        <span
          v-for="i in 6"
          :key="i"
          class="cap-cell"
          :class="{ on: i <= 3 + capacity }"
        />
      </div>
      <span class="cap-cap">{{ 3 + capacity }} / 6</span>
    </div>

    <div class="lanes">
      <div
        v-for="(t, i) in TOOLS"
        :key="t.name"
        class="lane"
        :class="{ done: i < delivered, live: i === current && travelling }"
      >
        <div class="track">
          <span
            v-if="i === current && travelling"
            class="packet"
            :style="{ left: `calc(${progress * 100}% - ${progress * 16}px)` }"
          />
          <span class="task">{{ t.task }}</span>
        </div>
        <div class="tool">
          <PixelArt :grid="t.grid" :scale="4" />
          <span class="tool-name">{{ t.name }}</span>
        </div>
      </div>
    </div>

    <div class="evidence">
      <span class="label">Evidencia</span>
      <p>Guardar información en un medio externo mejora el recuerdo de lo siguiente que estudias.</p>
      <cite>Storm &amp; Stone, 2015 · Risko &amp; Gilbert, 2016</cite>
    </div>
  </div>
</template>

<style scoped>
.delegate-scene {
  width: 100%;
  display: grid;
  grid-template-columns: 0.7fr 1.6fr 0.9fr;
  gap: 14px;
  align-items: stretch;
}

.person-card,
.lanes,
.evidence {
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--vellum);
  padding: 12px;
}

.person-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.person-card .label {
  font-size: 9px;
  color: var(--brick);
}

.p-scribe {
  width: 96px;
}

.cap-meter {
  display: flex;
  gap: 4px;
}

.cap-cell {
  width: 12px;
  height: 16px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--vellum);
}

.cap-cell.on {
  background: var(--sage);
  box-shadow: 0 0 0 2px var(--ink);
}

.cap-cap {
  font-family: 'VT323', monospace;
  font-size: 22px;
  line-height: 1;
  color: var(--ink);
}

.lanes {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 8px;
}

.lane {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0.6;
}

.lane.live,
.lane.done {
  opacity: 1;
}

.track {
  position: relative;
  flex: 1;
  height: 28px;
  border-bottom: 4px dashed var(--vellum);
}

.lane.done .track {
  border-bottom-color: var(--sage);
}

.packet {
  position: absolute;
  bottom: -10px;
  width: 16px;
  height: 16px;
  background: var(--gold);
  box-shadow: 0 0 0 2px var(--ink);
}

.task {
  position: absolute;
  right: 0;
  top: 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--oxblood);
}

.tool {
  flex: none;
  width: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--border);
}

.lane.done .tool {
  box-shadow: 0 0 0 2px var(--sage), 3px 3px 0 var(--vellum);
}

.tool-name {
  font-family: 'Silkscreen', monospace;
  font-size: 9px;
  text-transform: uppercase;
  color: var(--ink);
}

.evidence {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.evidence .label {
  font-size: 9px;
  color: var(--sage);
}

.evidence p {
  margin: 0;
  font-size: 15px;
  line-height: 1.25;
  color: var(--ink);
}

.evidence cite {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-style: normal;
  color: var(--muted);
}
</style>

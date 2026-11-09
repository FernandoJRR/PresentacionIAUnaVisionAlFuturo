<!--
  Orchestra.vue — Etapa 3: las chispas dispersas de la Etapa 2 atraviesan las guías del ingeniero
  (especificación, mockups, pruebas, fundamentos) y se alinean en una estructura ordenada.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../utils/frameLoop'
import { seeded } from '../utils/pixel'
import PixelCharacter from './PixelCharacter.vue'

const W = 600
const H = 240
const GATES = ['Especificación', 'Mockups', 'Pruebas', 'Fundamentos']
const GATE_X = GATES.map((_, i) => 140 + i * 100)
const rand = seeded(21)
const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  from: [Math.round(rand() * 110), Math.round(20 + rand() * (H - 40))],
  to: [500 + (i % 4) * 24, 72 + Math.floor(i / 4) * 24],
  hot: rand() < 0.5 ? 'var(--crimson)' : 'var(--vermilion)',
}))
const MOVE = 10

const frame = useFrameLoop(MOVE + 8, 380)
const t = computed(() => Math.min(1, frame.value / MOVE))
const snap = v => Math.round(v / 4) * 4
const sparks = computed(() => SPARKS.map(s => {
  const x = snap(s.from[0] + (s.to[0] - s.from[0]) * t.value)
  const y = snap(s.from[1] + (s.to[1] - s.from[1]) * t.value * t.value)
  const passed = GATE_X.filter(g => x > g).length
  return { x, y, c: passed >= GATES.length ? 'var(--sage)' : passed >= 2 ? 'var(--gold)' : s.hot }
}))
const lit = computed(() => GATE_X.map(g => sparks.value.some(s => Math.abs(s.x - g) < 14)))
</script>

<template>
  <div class="orch-wrap">
    <div class="cast">
      <PixelCharacter who="scribe" facing="right" class="who" />
      <PixelCharacter who="mage" facing="right" class="who" />
    </div>
    <div class="stage" :style="{ width: `${W}px`, height: `${H}px` }">
      <div v-for="(g, i) in GATES" :key="g" class="gate" :class="{ on: lit[i] }" :style="{ left: `${GATE_X[i]}px` }">
        <span class="label">{{ g }}</span>
      </div>
      <div class="target" />
      <span v-for="(s, i) in sparks" :key="i" class="spark" :style="{ left: `${s.x}px`, top: `${s.y}px`, background: s.c }" />
    </div>
  </div>
</template>

<style scoped>
.orch-wrap { flex: 1; display: flex; align-items: center; justify-content: center; gap: 16px; padding-bottom: 1.5rem; }
.cast { display: flex; flex-direction: column; gap: 8px; }
.who { width: 64px; }
.stage { position: relative; }

.gate {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8px;
  transform: translateX(-50%);
  background: repeating-linear-gradient(var(--vellum) 0 8px, transparent 8px 12px);
}
.gate.on { background: repeating-linear-gradient(var(--gold) 0 8px, transparent 8px 12px); }
.gate .label {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 10px;
  color: var(--brick);
}

.target {
  position: absolute;
  left: 488px;
  top: 60px;
  width: 104px;
  height: 104px;
  box-shadow: 0 0 0 2px var(--sage), inset 0 0 0 2px var(--card), inset 0 0 0 4px var(--gold);
}
.spark { position: absolute; width: 12px; height: 12px; box-shadow: 0 0 0 2px var(--ink); }
</style>

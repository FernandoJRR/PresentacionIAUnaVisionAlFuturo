<!--
  IoPanels.vue — Gramática visual común: Entrada → Modelo → Salida.

    <IoPanels :notes="['píxeles', 'convoluciones', 'dígito']">
      <template #input>...</template>
      <template #model>...</template>
      <template #output>...</template>
    </IoPanels>
-->
<script setup>
import PixelArt from './PixelArt.vue'

defineProps({
  notes: { type: Array, default: () => ['', '', ''] },
})

const ARROW = [
  '..YY....',
  '...YY...',
  '....YY..',
  'YYYYYYY.',
  'YYYYYYY.',
  '....YY..',
  '...YY...',
  '..YY....',
]
const PANELS = [
  { slot: 'input', cap: 'Entrada' },
  { slot: 'model', cap: 'Modelo' },
  { slot: 'output', cap: 'Salida' },
]
</script>

<template>
  <div class="io">
    <template v-for="(p, i) in PANELS" :key="p.slot">
      <PixelArt v-if="i > 0" :grid="ARROW" :scale="3" class="io-arrow" />
      <section class="io-panel" :class="p.slot">
        <span class="label io-cap">{{ p.cap }}</span>
        <div class="io-body"><slot :name="p.slot" /></div>
        <span class="io-note">{{ notes[i] }}</span>
      </section>
    </template>
  </div>
</template>

<style scoped>
.io {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 24px 1.55fr 24px 1fr;
  align-items: center;
  gap: 12px;
}

.io-panel {
  height: 264px;
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--vellum);
}
.io-panel.model { box-shadow: 0 0 0 3px var(--oxblood), inset 0 0 0 3px var(--card), inset 0 0 0 5px var(--gold), 4px 4px 0 3px var(--vellum); }

.io-cap { color: var(--brick); font-size: 11px; }
.io-body { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0; }
.io-note { font-size: 13px; text-align: center; color: var(--muted); }

.io-arrow { animation: nudge 1s steps(1, end) infinite; }
@keyframes nudge {
  0% { transform: translateX(0); }
  50% { transform: translateX(3px); }
  100% { transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .io-arrow { animation: none; }
}
</style>

<!--
  SceneFraude.vue — Detección de fraude con redes neuronales (Ghosh & Reilly, 1994).
  Cada transacción recorre la red y recibe un puntaje de riesgo. Montos y puntajes ilustrativos.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'
import PixelIcon from '../PixelIcon.vue'
import PixelNet from '../PixelNet.vue'

const TXS = [
  { amount: 'Q 45', where: 'Xela · 12:10', risk: 0.04 },
  { amount: 'Q 120', where: 'Antigua · 18:30', risk: 0.07 },
  { amount: 'Q 60', where: 'Guate · 19:05', risk: 0.03 },
  { amount: 'Q 8 900', where: 'extranjero · 03:12', risk: 0.97 },
]
const PER = 3

const frame = useFrameLoop(TXS.length * PER + 3, 450)
const k = computed(() => Math.min(TXS.length - 1, Math.floor(frame.value / PER)))
const phase = computed(() => (frame.value >= TXS.length * PER ? PER - 1 : frame.value % PER))
const tx = computed(() => TXS[k.value])
const scored = computed(() => phase.value === PER - 1)
const blocked = computed(() => scored.value && tx.value.risk > 0.5)
</script>

<template>
  <IoPanels :notes="['transacciones', 'puntaje de riesgo', 'decisión']">
    <template #input>
      <ul class="txs">
        <li v-for="(t, i) in TXS" :key="i" :class="{ cur: i === k, past: i < k }">
          <b>{{ t.amount }}</b><span>{{ t.where }}</span>
        </li>
      </ul>
    </template>

    <template #model>
      <div class="scorer">
        <PixelNet :layers="[4, 5, 1]" :fwd="phase" :hot="tx.risk > 0.5 ? 'var(--crimson)' : 'var(--gold)'" />
        <div class="risk">
          <span>riesgo</span>
          <i class="bar"><b :class="{ hi: tx.risk > 0.5 }" :style="{ width: scored ? `${Math.max(1, Math.round(tx.risk * 20)) * 6}px` : '0' }" /></i>
        </div>
      </div>
    </template>

    <template #output>
      <div class="card" :class="{ blocked }">
        <PixelIcon name="card" class="ico" />
        <span class="status">{{ !scored ? '···' : blocked ? 'bloqueada' : 'aprobada' }}</span>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.txs { display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0; list-style: none; width: 100%; }
.txs li {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 2px 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: var(--muted);
  box-shadow: 0 0 0 2px var(--vellum);
}
.txs li b { font-size: 14px; }
.txs li.past { color: var(--ink); }
.txs li.cur { color: var(--card); background: var(--ink); box-shadow: 0 0 0 2px var(--ink); }

.scorer { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.risk { display: flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--muted); }
.bar { display: block; width: 120px; height: 10px; background: var(--vellum); }
.bar b { display: block; height: 100%; background: var(--sage); }
.bar b.hi { background: var(--crimson); }

.card { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.ico { width: 64px; height: 64px; color: var(--ink); }
.status {
  padding: 2px 10px;
  font-family: 'VT323', monospace;
  font-size: 24px;
  background: var(--sage);
  box-shadow: 0 0 0 2px var(--ink);
}
.blocked .ico { color: var(--crimson); }
.blocked .status { color: var(--card); background: var(--crimson); }
</style>

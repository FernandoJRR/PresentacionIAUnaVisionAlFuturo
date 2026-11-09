<!--
  SceneXcon.vue — Sistema experto XCON/R1 (McDermott, 1982).
  Reglas SI → ENTONCES se disparan en secuencia y arman la configuración del gabinete.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'

const ORDER = ['CPU', '2 discos', 'memoria']
const RULES = [
  { cond: 'cpu', act: 'gabinete', at: 1 },
  { cond: 'disco', act: 'controlador', at: 3 },
  { cond: 'discos > 1', act: 'fuente extra', at: 5 },
]

const frame = useFrameLoop(10, 650)
const fired = computed(() => RULES.filter(r => frame.value >= r.at).length)
const current = computed(() => RULES.findIndex(r => r.at === frame.value || r.at + 1 === frame.value))
</script>

<template>
  <IoPanels :notes="['pedido', 'reglas SI → ENTONCES', 'configuración']">
    <template #input>
      <ul class="order">
        <li v-for="o in ORDER" :key="o">{{ o }}</li>
      </ul>
    </template>

    <template #model>
      <ul class="rules">
        <li v-for="(r, i) in RULES" :key="i" :class="{ fired: i < fired, cur: i === current }">
          <b>SI</b> {{ r.cond }} <b>→</b> {{ r.act }}
        </li>
      </ul>
    </template>

    <template #output>
      <div class="rack" :class="{ on: fired >= 1 }">
        <div class="slot cpu">CPU</div>
        <div class="slot ctl" :class="{ on: fired >= 2 }" />
        <div class="slot disk" :class="{ on: fired >= 2 }" />
        <div class="slot disk" :class="{ on: fired >= 2 }" />
        <div class="slot psu" :class="{ on: fired >= 3 }" />
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.order { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
.order li {
  margin: 0;
  padding: 2px 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}

.rules { display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; list-style: none; }
.rules li {
  margin: 0;
  padding: 6px 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  color: var(--muted);
  box-shadow: 0 0 0 2px var(--vellum);
}
.rules b { color: inherit; }
.rules li.fired { color: var(--ink); box-shadow: 0 0 0 2px var(--ink); }
.rules li.fired b { color: var(--crimson); }
.rules li.cur { background: var(--gold); transform: translateX(4px); }

.rack {
  width: 112px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  box-shadow: 0 0 0 3px var(--vellum);
}
.rack.on { box-shadow: 0 0 0 3px var(--ink), 4px 4px 0 3px var(--vellum); }
.slot { height: 24px; background: var(--page); box-shadow: inset 0 0 0 2px var(--vellum); }
.slot.cpu {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--card);
  background: var(--ink);
}
.slot.ctl.on { background: var(--gold); box-shadow: inset 0 0 0 2px var(--ink); }
.slot.disk.on { background: repeating-linear-gradient(90deg, var(--border) 0 6px, var(--muted) 6px 8px); box-shadow: inset 0 0 0 2px var(--ink); }
.slot.psu.on { background: var(--crimson); box-shadow: inset 0 0 0 2px var(--ink); }
</style>

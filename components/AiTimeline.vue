<!--
  AiTimeline.vue — Línea de tiempo pixel-art: teoría arriba del eje, aplicaciones abajo.

    <AiTimeline :items="ITEMS" :eras="ERAS" :step="$clicks" cast="scribe" />

  items: { year, label, kind: 'theory' | 'use', era, group, icon? }
  eras:  { [key]: { name, color, spark? } }
  step:  grupos revelados (group <= step); usar con `clicks: N` en el frontmatter.
  cast:  'scribe' a la izquierda | 'mage' a la derecha.
-->
<script setup>
import { computed } from 'vue'
import PixelCharacter from './PixelCharacter.vue'
import PixelIcon from './PixelIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  eras: { type: Object, required: true },
  step: { type: Number, default: Infinity },
  cast: { type: String, default: null },
})

const cols = computed(() =>
  props.items.map(i => (i.kind === 'theory' ? '0.6fr' : '1fr')).join(' '))

const legend = computed(() => Object.entries(props.eras).map(([key, e]) => ({ key, ...e })))

const isOn = item => (item.group ?? 0) <= props.step
const eraColor = item => props.eras[item.era]?.color ?? 'var(--ink)'
const hasSpark = item => props.eras[item.era]?.spark
</script>

<template>
  <div class="tl" :class="`cast-${cast}`">
    <ul class="tl-legend">
      <li><span class="mk theory" /> Teoría</li>
      <li v-for="e in legend" :key="e.key">
        <span class="mk" :style="{ background: e.color }" /> {{ e.name }}
      </li>
    </ul>

    <div class="tl-body">
      <PixelCharacter v-if="cast" :who="cast" :facing="cast === 'mage' ? 'left' : 'right'" class="tl-cast" />

      <div class="tl-track" :style="{ gridTemplateColumns: cols }">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="tl-col"
          :class="[item.kind, { on: isOn(item) }]"
          :style="{ '--era': eraColor(item) }"
        >
          <div class="band top">
            <div v-if="item.kind === 'theory'" class="theory-tag">
              <span class="year">{{ item.year }}</span>
              <span class="name">{{ item.label }}</span>
            </div>
          </div>

          <div class="axis"><span class="node" /></div>

          <div class="band bottom">
            <template v-if="item.kind === 'use'">
              <span class="stem" />
              <div class="tl-card">
                <PixelIcon :name="item.icon" />
                <span class="year">{{ item.year }}</span>
                <span class="name">{{ item.label }}</span>
                <template v-if="hasSpark(item)">
                  <i class="spark s1" /><i class="spark s2" /><i class="spark s3" />
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tl { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; margin-top: 0.5rem; }

.tl-legend {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: 'Silkscreen', monospace;
  font-size: 11px;
  text-transform: uppercase;
  color: var(--muted);
}
.tl-legend li { display: flex; align-items: center; gap: 0.4rem; margin: 0; }
.mk { display: inline-block; width: 10px; height: 10px; box-shadow: 0 0 0 2px var(--ink); }
.mk.theory { background: var(--card); box-shadow: 0 0 0 2px var(--gold); }

.tl-body { flex: 1; display: flex; align-items: center; gap: 1rem; padding-bottom: 2rem; }
.cast-mage .tl-body { flex-direction: row-reverse; }
.tl-cast { width: 64px; flex: none; }

.tl-track { flex: 1; display: grid; }

.tl-col { display: grid; grid-template-rows: 52px 16px auto; min-width: 0; }

.band { display: flex; flex-direction: column; align-items: center; }
.band.top { justify-content: flex-end; padding-bottom: 6px; }

/* Axis: vellum until the column is revealed, then era color */
.axis { position: relative; display: flex; align-items: center; justify-content: center; }
.axis::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background: repeating-linear-gradient(90deg, var(--vellum) 0 8px, transparent 8px 12px);
}
.on .axis::before { background: var(--era); }
.theory.on .axis::before { background: var(--gold); }

.node {
  position: relative;
  width: 12px;
  height: 12px;
  background: var(--vellum);
  box-shadow: 0 0 0 2px var(--page);
}
.on .node { background: var(--era); box-shadow: 0 0 0 2px var(--ink); }
.theory .node { width: 8px; height: 8px; }
.theory.on .node { background: var(--card); box-shadow: 0 0 0 2px var(--gold); }

.theory-tag,
.stem,
.tl-card { visibility: hidden; }
.on .theory-tag,
.on .stem,
.on .tl-card { visibility: visible; animation: pop 0.3s steps(1, end) both; }

.theory-tag { display: flex; flex-direction: column; align-items: center; line-height: 1; }
.theory-tag .year { font-family: 'VT323', monospace; font-size: 18px; color: var(--muted); }
.theory-tag .name {
  font-family: 'Silkscreen', monospace;
  font-size: 9px;
  text-transform: uppercase;
  color: var(--brick);
}

.stem {
  width: 2px;
  height: 14px;
  background: repeating-linear-gradient(var(--border) 0 2px, transparent 2px 4px);
}

.tl-card {
  position: relative;
  width: calc(100% - 6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 4px 6px;
  background: var(--card);
  border-top: 4px solid var(--era);
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 2px var(--vellum);
  text-align: center;
}
.tl-card .pixel-icon { width: 32px; height: 32px; color: var(--ink); }
.tl-card .year { font-family: 'VT323', monospace; font-size: 22px; line-height: 1; color: var(--oxblood); }
.tl-card .name { min-height: 2.3em; font-size: 13px; line-height: 1.15; color: var(--ink); }

/* Volatile energy around foundation-model cards */
.spark { position: absolute; width: 4px; height: 4px; opacity: 0; animation: spark 1.2s steps(1, end) infinite; }
.s1 { top: -12px; left: 6px; background: var(--vermilion); }
.s2 { top: 10px; right: -10px; background: var(--crimson); animation-delay: 0.4s; }
.s3 { bottom: -10px; left: 40%; background: var(--gold); animation-delay: 0.8s; }

@keyframes pop {
  0% { opacity: 0; transform: translateY(4px); }
  33% { opacity: 1; transform: translateY(2px); }
  66% { transform: translateY(1px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes spark {
  0% { opacity: 0; }
  50% { opacity: 1; }
  75%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .tl * { animation: none !important; }
  .spark { opacity: 1; }
}
</style>

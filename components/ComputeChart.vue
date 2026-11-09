<!--
  ComputeChart.vue — Cómputo de entrenamiento (FLOP, escala log) 1950–2025.
  Tendencias según Sevilla et al. (2022): ×2 cada ~20 meses antes de 2010, ×2 cada ~6 meses después.
  Puntos en órdenes de magnitud aproximados.

    <ComputeChart :step="$clicks" />   (clicks: 2)
-->
<script setup>
import { computed } from 'vue'
import { line } from '../utils/pixel'
import PixelCharacter from './PixelCharacter.vue'

const props = defineProps({ step: { type: Number, default: Infinity } })

const W = 140
const H = 56
const X0 = 1950
const X1 = 2025
const Y0 = 4
const Y1 = 26
const px = year => Math.round(8 + (year - X0) * (W - 14) / (X1 - X0))
const py = log => Math.round(H - 6 - (log - Y0) * (H - 10) / (Y1 - Y0))

const POINTS = [
  { year: 1958, log: 5.8, name: 'Perceptrón', step: 0 },
  { year: 2012, log: 17.7, name: 'AlexNet', step: 1, anchor: 'left' },
  { year: 2017, log: 19, name: 'Transformer', step: 1, anchor: 'right' },
  { year: 2020, log: 23.5, name: 'GPT-3', step: 2, anchor: 'left' },
  { year: 2023, log: 25.3, name: '2023', step: 2 },
]
const SLOW = line(px(1958), py(5.8), px(2010), py(15.2))
const FAST = line(px(2010), py(15.2), px(2024), py(23.6))

const YEARS = [1960, 1980, 2000, 2020]
const LOGS = [6, 12, 18, 24]

const pts = computed(() => POINTS.filter(p => p.step <= props.step))
const pct = (v, total) => `${(v / total) * 100}%`
</script>

<template>
  <div class="chart">
    <div class="plot">
      <svg :viewBox="`0 0 ${W} ${H}`" shape-rendering="crispEdges" aria-hidden="true">
        <rect x="7" y="2" width="1" :height="H - 7" fill="var(--ink)" />
        <rect x="7" :y="H - 6" :width="W - 9" height="1" fill="var(--ink)" />
        <template v-for="y in YEARS" :key="`x${y}`">
          <rect :x="px(y)" :y="H - 5" width="1" height="1" fill="var(--ink)" />
        </template>
        <template v-for="l in LOGS" :key="`y${l}`">
          <rect x="6" :y="py(l)" width="1" height="1" fill="var(--ink)" />
          <rect v-for="x in 30" :key="x" :x="8 + x * 4" :y="py(l)" width="1" height="1" fill="var(--vellum)" />
        </template>

        <rect v-for="(c, i) in SLOW" :key="`s${i}`" :x="c[0]" :y="c[1]" width="1" height="1" fill="var(--gold)" />
        <g v-if="step >= 1" class="pop">
          <rect v-for="(c, i) in FAST" :key="`f${i}`" :x="c[0]" :y="c[1]" width="1" height="1" fill="var(--crimson)" />
        </g>

        <rect v-for="p in pts" :key="p.name" class="pop" :x="px(p.year) - 1" :y="py(p.log) - 1" width="3" height="3"
          :fill="p.year < 2010 ? 'var(--gold)' : 'var(--crimson)'" stroke="var(--ink)" stroke-width="0.4" />
      </svg>

      <span v-for="p in pts" :key="`l${p.name}`" class="pt-label pop" :class="p.anchor"
        :style="{ left: pct(px(p.year), W), top: pct(py(p.log), H) }">{{ p.name }}</span>

      <span v-for="y in YEARS" :key="`ty${y}`" class="tick-x" :style="{ left: pct(px(y), W) }">{{ y }}</span>
      <span v-for="l in LOGS" :key="`tl${l}`" class="tick-y" :style="{ top: pct(py(l), H) }">10<sup>{{ l }}</sup></span>

      <span class="trend slow" :style="{ left: pct(px(1984), W), top: pct(py(9), H) }">×2 cada ~20 meses</span>
      <span v-if="step >= 1" class="trend fast pop" :style="{ left: pct(px(2008), W), top: pct(py(21), H) }">×2 cada ~6 meses</span>

      <PixelCharacter v-if="step >= 2" who="mage" facing="left" class="pusher pop" />
    </div>
    <span class="axis-name label">Cómputo de entrenamiento · FLOP · escala log</span>
  </div>
</template>

<style scoped>
.chart { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 6px; padding: 0 16px 2rem 40px; }
.plot { position: relative; width: 700px; height: 280px; }
.plot svg { width: 700px; height: 280px; display: block; }

.pt-label {
  position: absolute;
  transform: translate(-50%, -150%);
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--brick);
}
.pt-label.left { transform: translate(-115%, -50%); }
.pt-label.right { transform: translate(15%, -50%); }
.tick-x,
.tick-y { position: absolute; font-family: 'VT323', monospace; font-size: 16px; color: var(--muted); }
.tick-x { bottom: -8px; transform: translateX(-50%); }
.tick-y { left: -40px; transform: translateY(-50%); }

.trend { position: absolute; font-family: 'Pixelify Sans', sans-serif; font-size: 17px; white-space: nowrap; }
.trend.slow { color: var(--brick); }
.trend.fast { color: var(--crimson); transform: translateX(-100%); }

.plot .pusher { position: absolute; right: -76px; top: -12px; width: 64px; }
.axis-name { color: var(--muted); font-size: 10px; }

.pop { animation: pop 0.3s steps(1, end) both; }
@keyframes pop {
  0% { opacity: 0; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .pop { animation: none; }
}
</style>

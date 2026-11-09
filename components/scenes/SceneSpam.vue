<!--
  SceneSpam.vue — Filtro bayesiano antispam (Sahami et al., 1998).
  Cada palabra aporta evidencia a un platillo; la probabilidad acumulada decide la bandeja.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { line } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'
import PixelIcon from '../PixelIcon.vue'

const WORDS = [
  { w: 'hola', spam: false },
  { w: '¡gratis!', spam: true },
  { w: 'premio', spam: true },
  { w: 'clic', spam: true },
]
// Posterior after each word, starting from a 50% prior
const POSTERIOR = [0.5, 0.38, 0.71, 0.89, 0.97]

const frame = useFrameLoop(14, 500)

const seen = computed(() => Math.min(WORDS.length, Math.floor(frame.value / 2)))
const spamCount = computed(() => WORDS.slice(0, seen.value).filter(x => x.spam).length)
const hamCount = computed(() => seen.value - spamCount.value)
const tilt = computed(() => Math.max(-3, Math.min(3, spamCount.value - hamCount.value)))
const p = computed(() => POSTERIOR[seen.value])
const segments = computed(() => Math.round(p.value * 20))
const sorted = computed(() => frame.value >= 10)

const yL = computed(() => 8 + tilt.value)
const yR = computed(() => 8 - tilt.value)
const beam = computed(() => line(6, yL.value, 34, yR.value))
const BLOCKS = [[3, -2], [7, -2], [5, -4]]
</script>

<template>
  <IoPanels :notes="['palabras', 'probabilidad', 'bandeja']">
    <template #input>
      <div class="mail">
        <PixelIcon name="mail" class="env" />
        <div class="chips">
          <span
            v-for="(x, i) in WORDS"
            :key="x.w"
            class="chip"
            :class="{ cur: i === seen - 1, spam: i < seen && x.spam, ham: i < seen && !x.spam }"
          >{{ x.w }}</span>
        </div>
      </div>
    </template>

    <template #model>
      <div class="scale-wrap">
        <svg viewBox="0 0 40 28" class="scale" shape-rendering="crispEdges" aria-hidden="true">
          <rect x="19" y="7" width="2" height="18" fill="var(--ink)" />
          <rect x="14" y="25" width="12" height="2" fill="var(--ink)" />
          <rect x="18" y="6" width="4" height="2" fill="var(--gold)" />
          <rect v-for="(b, i) in beam" :key="`b${i}`" :x="b[0]" :y="b[1]" width="1" height="1" fill="var(--ink)" />

          <rect x="6" :y="yL" width="1" :height="6" fill="var(--border)" />
          <rect x="2" :y="yL + 6" width="9" height="1" fill="var(--ink)" />
          <rect x="3" :y="yL + 7" width="7" height="1" fill="var(--ink)" />
          <rect v-for="(b, i) in BLOCKS.slice(0, spamCount)" :key="`s${i}`"
            :x="b[0] - 1" :y="yL + 6 + b[1]" width="3" height="2" fill="var(--crimson)" />

          <rect x="34" :y="yR" width="1" :height="6" fill="var(--border)" />
          <rect x="30" :y="yR + 6" width="9" height="1" fill="var(--ink)" />
          <rect x="31" :y="yR + 7" width="7" height="1" fill="var(--ink)" />
          <rect v-for="(b, i) in BLOCKS.slice(0, hamCount)" :key="`h${i}`"
            :x="b[0] + 27" :y="yR + 6 + b[1]" width="3" height="2" fill="var(--sage)" />
        </svg>

        <div class="meter">
          <span class="pct">P(spam) {{ Math.round(p * 100) }}%</span>
          <div class="segs">
            <i v-for="n in 20" :key="n" :class="{ on: n <= segments }" />
          </div>
        </div>
      </div>
    </template>

    <template #output>
      <div class="trays">
        <div class="tray inbox"><span class="label">Bandeja</span></div>
        <div class="tray junk">
          <span class="label">Spam</span>
          <PixelIcon v-if="sorted" name="mail" class="env drop" />
        </div>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.mail { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.env { width: 48px; height: 48px; color: var(--ink); }
.chips { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.chip {
  padding: 1px 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--vellum);
}
.chip.cur { transform: translateY(-2px); }
.chip.spam { color: var(--card); background: var(--crimson); box-shadow: 0 0 0 2px var(--ink); }
.chip.ham { color: var(--ink); background: var(--sage); box-shadow: 0 0 0 2px var(--ink); }

.scale-wrap { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.scale { width: 240px; height: 168px; }
.meter { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.pct { font-family: 'VT323', monospace; font-size: 22px; line-height: 1; color: var(--oxblood); }
.segs { display: flex; gap: 2px; }
.segs i { width: 8px; height: 10px; background: var(--vellum); }
.segs i.on { background: var(--crimson); }

.trays { display: flex; flex-direction: column; gap: 14px; width: 100%; }
.tray {
  position: relative;
  height: 72px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 4px;
  background: var(--page);
}
.tray .label { font-size: 10px; }
.inbox { box-shadow: inset 0 0 0 2px var(--sage); }
.inbox .label { color: var(--muted); }
.junk { box-shadow: inset 0 0 0 2px var(--crimson); }
.junk .label { color: var(--crimson); }
.junk .env { position: absolute; bottom: 8px; width: 32px; height: 32px; }

.drop { animation: drop 0.45s steps(1, end) both; }
@keyframes drop {
  0% { transform: translateY(-24px); }
  33% { transform: translateY(-12px); }
  66% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .drop { animation: none; }
}
</style>

<!--
  SceneSendai.vue — Control predictivo difuso del metro de Sendai (Yasunobu & Miyamoto, 1985).
  La distancia a la estación activa grados de pertenencia "lejos/media/cerca" que gradúan el freno.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { line } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'
import PixelArt from '../PixelArt.vue'

const DIST = [400, 320, 250, 190, 140, 95, 60, 30, 10, 0]
const SPEED = [60, 58, 54, 48, 40, 32, 24, 15, 6, 0]
const TRAIN = [
  '.KKKKKKKKKKKKKKKKKK.',
  'KKYYKKYYKKYYKKYYKKK.',
  'KKYYKKYYKKYYKKYYKKKK',
  'KCCCCCCCCCCCCCCCCCCK',
  'KKKKKKKKKKKKKKKKKKKK',
  '..KK..........KK....',
]

const frame = useFrameLoop(DIST.length + 3, 550)
const i = computed(() => Math.min(DIST.length - 1, frame.value))
const d = computed(() => DIST[i.value])

const tri = (x, a, b, c) => (x <= a || x >= c ? (x === b ? 1 : 0) : x < b ? (x - a) / (b - a) : (c - x) / (c - b))
const SETS = [
  { name: 'cerca', a: -1, b: 0, c: 150, color: 'var(--crimson)' },
  { name: 'media', a: 0, b: 150, c: 300, color: 'var(--gold)' },
  { name: 'lejos', a: 150, b: 400, c: 401, color: 'var(--sage)' },
]
const degrees = computed(() => SETS.map(s => tri(d.value, s.a, s.b, s.c)))

const X = v => Math.round(2 + v / 400 * 56)
const Y = m => Math.round(22 - m * 18)
const curves = SETS.map(s => [
  ...line(X(Math.max(0, s.a)), Y(s.a < 0 ? 1 : 0), X(s.b), Y(1)),
  ...line(X(s.b), Y(1), X(Math.min(400, s.c)), Y(s.c > 400 ? 1 : 0)),
])

const trainX = computed(() => Math.round((1 - d.value / 400) * 120))
</script>

<template>
  <IoPanels :notes="['velocidad y distancia', 'reglas difusas', 'frenado']">
    <template #input>
      <div class="gauges">
        <div><span class="n">{{ SPEED[i] }}</span><span class="u">km/h</span></div>
        <div><span class="n">{{ d }}</span><span class="u">m</span></div>
      </div>
    </template>

    <template #model>
      <div class="fuzzy">
        <svg viewBox="0 0 60 26" class="sets" shape-rendering="crispEdges" aria-hidden="true">
          <rect x="1" y="22" width="58" height="1" fill="var(--ink)" />
          <template v-for="(c, k) in curves" :key="k">
            <rect v-for="(p, j) in c" :key="j" :x="p[0]" :y="p[1]" width="1" height="1" :fill="SETS[k].color" />
          </template>
          <rect :x="X(d)" y="2" width="1" height="21" fill="var(--ink)" />
        </svg>
        <div class="deg">
          <span v-for="(s, k) in SETS" :key="s.name">
            {{ s.name }}
            <i class="bar"><b :style="{ width: `${Math.round(degrees[k] * 10) * 6}px`, background: s.color }" /></i>
          </span>
        </div>
      </div>
    </template>

    <template #output>
      <div class="track">
        <PixelArt :grid="TRAIN" :scale="3" class="train" :style="{ transform: `translateX(${trainX}px)` }" />
        <div class="rail" />
        <div class="mark" />
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.gauges { display: flex; flex-direction: column; gap: 14px; }
.gauges div { display: flex; align-items: baseline; gap: 6px; padding: 4px 12px; background: var(--page); box-shadow: 0 0 0 2px var(--ink); }
.n { font-family: 'VT323', monospace; font-size: 36px; line-height: 1; min-width: 56px; text-align: right; }
.u { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--muted); }

.fuzzy { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.sets { width: 300px; height: 130px; }
.deg { display: flex; gap: 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; }
.deg span { display: flex; flex-direction: column; gap: 2px; }
.bar { display: block; width: 60px; height: 8px; background: var(--vellum); }
.bar b { display: block; height: 100%; }

.track { position: relative; width: 200px; height: 60px; }
.train { position: absolute; left: 0; bottom: 6px; }
.rail { position: absolute; left: 0; right: 0; bottom: 0; height: 6px; background: repeating-linear-gradient(90deg, var(--ink) 0 6px, var(--border) 6px 12px); }
.mark { position: absolute; left: 178px; bottom: 6px; width: 4px; height: 40px; background: var(--crimson); }
</style>

<!--
  SceneRetina.vue — Diagnóstico autónomo de retinopatía diabética (Abràmoff et al., 2018).
  Fondo de ojo procedural; el análisis por regiones marca las que contienen lesiones y decide derivar.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { line } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'
import PixelArt from '../PixelArt.vue'

const N = 30
const C = 14.5
const R = 14
const cells = Array.from({ length: N }, (_, y) => Array.from({ length: N }, (_, x) => {
  const inside = (x - C) ** 2 + (y - C) ** 2 <= R * R
  return inside ? ((x + y) % 2 ? 'R' : 'O') : '.'
}))
const put = (x, y, ch) => { if (cells[y]?.[x] && cells[y][x] !== '.') cells[y][x] = ch }

// Vessels from the optic disc, disc itself and lesions
const DISC = [9, 14]
;[[3, 5], [3, 23], [24, 6], [25, 22], [16, 2], [17, 27]].forEach(([x, y]) =>
  line(DISC[0], DISC[1], x, y).forEach(([a, b]) => put(a, b, 'I')))
for (let y = -2; y <= 2; y++)
  for (let x = -2; x <= 2; x++)
    if (x * x + y * y <= 5) put(DISC[0] + x, DISC[1] + y, 'Y')
const LESIONS = [[19, 9], [20, 10], [22, 17], [17, 20], [21, 21]]
LESIONS.forEach(([x, y]) => put(x, y, 'B'))
const FUNDUS = cells.map(r => r.join(''))

// 3x3 regions of 10x10 cells
const REGIONS = Array.from({ length: 9 }, (_, i) => ({ rx: i % 3, ry: Math.floor(i / 3) }))
const hits = REGIONS.map(({ rx, ry }) => LESIONS.filter(([x, y]) => Math.floor(x / 10) === rx && Math.floor(y / 10) === ry).length)

const frame = useFrameLoop(REGIONS.length + 4, 450)
const scanned = computed(() => Math.min(REGIONS.length, frame.value + 1))
const done = computed(() => frame.value >= REGIONS.length)
</script>

<template>
  <IoPanels :notes="['fotografía de retina', 'análisis por regiones', 'decisión clínica']">
    <template #input>
      <PixelArt :grid="FUNDUS" :scale="5" :colors="{ B: 'var(--card)' }" />
    </template>

    <template #model>
      <div class="scan">
        <PixelArt :grid="FUNDUS" :scale="5" :colors="{ B: 'var(--card)' }" />
        <div class="regions">
          <span
            v-for="(r, i) in REGIONS"
            :key="i"
            class="reg"
            :class="{ cur: i === scanned - 1 && !done, seen: i < scanned, hit: i < scanned && hits[i] }"
          />
        </div>
      </div>
    </template>

    <template #output>
      <div class="decision">
        <span class="opt" :class="{ on: done }">Referir</span>
        <span class="opt ok">Sin hallazgos</span>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.scan { position: relative; }
.regions { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(3, 1fr); }
.reg.cur { box-shadow: inset 0 0 0 3px var(--ink); }
.reg.seen { background: color-mix(in srgb, var(--page) 35%, transparent); }
.reg.hit { background: none; box-shadow: inset 0 0 0 3px var(--gold); }

.decision { display: flex; flex-direction: column; gap: 14px; }
.opt {
  padding: 4px 12px;
  font-family: 'VT323', monospace;
  font-size: 24px;
  text-align: center;
  color: var(--muted);
  box-shadow: 0 0 0 2px var(--vellum);
}
.opt.on { color: var(--card); background: var(--crimson); box-shadow: 0 0 0 2px var(--ink); }
.opt.ok { text-decoration: line-through; }
</style>

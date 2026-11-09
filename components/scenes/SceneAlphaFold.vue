<!--
  SceneAlphaFold.vue — Predicción de estructura de proteínas (Jumper et al., 2021).
  El mapa de distancias entre residuos se refina por iteraciones y la cadena se pliega. Estructura ilustrativa.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { heat, line, seeded } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'

const SEQ = 'MKTAYIAKQR'.split('')
const TYPE = { M: 'gold', A: 'gold', I: 'gold', Y: 'gold', K: 'crimson', R: 'crimson', T: 'sage', Q: 'sage' }
const FOLDED = [[4, 4], [8, 4], [12, 5], [16, 7], [19, 10], [18, 14], [14, 16], [10, 16], [7, 19], [10, 22]]
const STRAIGHT = SEQ.map((_, i) => [2 + i * 2, 13])

const maxD = 20
const TARGET = FOLDED.map(a => FOLDED.map(b => Math.max(0, 1 - Math.hypot(a[0] - b[0], a[1] - b[1]) / maxD)))
const rand = seeded(3)
const NOISE = TARGET.map(r => r.map(() => rand()))

const ITERS = 5
const frame = useFrameLoop(ITERS * 2 + 3, 500)
const t = computed(() => Math.min(1, frame.value / (ITERS * 2 - 1)))
const dmap = computed(() => TARGET.flatMap((r, y) => r.map((v, x) => ({ x, y, c: heat(v * t.value + NOISE[y][x] * (1 - t.value)) }))))
const chain = computed(() => STRAIGHT.map((s, i) => [
  Math.round(s[0] + (FOLDED[i][0] - s[0]) * t.value),
  Math.round(s[1] + (FOLDED[i][1] - s[1]) * t.value),
]))
const links = computed(() => chain.value.slice(1).flatMap((p, i) => line(chain.value[i][0], chain.value[i][1], p[0], p[1])))
</script>

<template>
  <IoPanels :notes="['secuencia de aminoácidos', 'mapa de distancias', 'estructura']">
    <template #input>
      <div class="seq">
        <span v-for="(a, i) in SEQ" :key="i" class="aa" :style="{ background: `var(--${TYPE[a]})` }">{{ a }}</span>
      </div>
    </template>

    <template #model>
      <div class="refine">
        <svg viewBox="0 0 40 40" class="dmap" shape-rendering="crispEdges" aria-hidden="true">
          <rect v-for="(c, i) in dmap" :key="i" :x="c.x * 4" :y="c.y * 4" width="4" height="4" :fill="c.c" />
        </svg>
        <span class="it">iteración {{ Math.min(ITERS, Math.floor(frame / 2) + 1) }}</span>
      </div>
    </template>

    <template #output>
      <svg viewBox="0 0 24 26" class="fold" shape-rendering="crispEdges" aria-hidden="true">
        <rect v-for="(p, i) in links" :key="`l${i}`" :x="p[0]" :y="p[1]" width="1" height="1" fill="var(--border)" />
        <rect v-for="(p, i) in chain" :key="i" :x="p[0] - 1" :y="p[1] - 1" width="2" height="2" :fill="`var(--${TYPE[SEQ[i]]})`" />
      </svg>
    </template>
  </IoPanels>
</template>

<style scoped>
.seq { display: grid; grid-template-columns: repeat(5, 28px); gap: 6px; }
.aa {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  box-shadow: 0 0 0 2px var(--ink);
}
.refine { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.dmap { width: 180px; height: 180px; box-shadow: 0 0 0 2px var(--ink); }
.it { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--muted); }
.fold { width: 168px; height: 182px; }
</style>

<!--
  SceneTransformer.vue — Auto-atención (Vaswani et al., 2017).
  La matriz se revela fila por fila; "banco" atiende a "senté" y "parque" y se resuelve como asiento.
  Pesos ilustrativos.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { heat } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'

const TOKENS = ['Me', 'senté', 'en', 'el', 'banco', 'del', 'parque']
const ATT = [
  [0.9, 0.3, 0, 0, 0, 0, 0],
  [0.4, 0.9, 0.2, 0, 0.5, 0, 0.2],
  [0, 0.3, 0.9, 0.3, 0.4, 0, 0],
  [0, 0, 0.2, 0.9, 0.6, 0, 0],
  [0, 0.8, 0.1, 0.2, 0.9, 0.3, 0.8],
  [0, 0, 0, 0, 0.4, 0.9, 0.6],
  [0, 0.2, 0, 0, 0.5, 0.5, 0.9],
]
const FOCUS = 4

const frame = useFrameLoop(TOKENS.length + 6, 550)
const row = computed(() => (frame.value < TOKENS.length ? frame.value : FOCUS))
const done = computed(() => frame.value >= TOKENS.length)
const cells = computed(() => ATT.flatMap((r, y) => r.map((v, x) => ({
  x, y, c: y <= frame.value || done.value ? heat(v) : 'var(--page)',
}))))
const linked = computed(() => ATT[row.value].map((v, i) => i !== row.value && v >= 0.5))
</script>

<template>
  <IoPanels :notes="['tokens', 'matriz de atención', 'significado en contexto']">
    <template #input>
      <div class="toks">
        <span v-for="(t, i) in TOKENS" :key="t" class="tok" :class="{ cur: i === row, link: linked[i] }">{{ t }}</span>
      </div>
    </template>

    <template #model>
      <svg viewBox="0 0 28 28" class="matrix" shape-rendering="crispEdges" aria-hidden="true">
        <rect v-for="(c, i) in cells" :key="i" :x="c.x * 4" :y="c.y * 4" width="3" height="3" :fill="c.c" />
        <rect x="-0.5" :y="row * 4 - 0.5" width="28" height="4" fill="none" stroke="var(--ink)" stroke-width="0.5" />
      </svg>
    </template>

    <template #output>
      <div class="sense" :class="{ show: done }">
        <span class="word">banco</span>
        <span class="opt yes">asiento</span>
        <span class="opt no">dinero</span>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.toks { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.tok {
  padding: 0 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  box-shadow: 0 0 0 2px var(--vellum);
  background: var(--page);
}
.tok.link { box-shadow: 0 0 0 2px var(--gold); background: var(--card); }
.tok.cur { color: var(--card); background: var(--crimson); box-shadow: 0 0 0 2px var(--ink); }

.matrix { width: 196px; height: 196px; }

.sense { display: flex; flex-direction: column; align-items: center; gap: 10px; visibility: hidden; }
.sense.show { visibility: visible; }
.word { font-family: 'VT323', monospace; font-size: 36px; color: var(--oxblood); line-height: 1; }
.opt { padding: 2px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 15px; }
.opt.yes { background: var(--sage); box-shadow: 0 0 0 2px var(--ink); }
.opt.no { color: var(--muted); text-decoration: line-through; box-shadow: 0 0 0 2px var(--vellum); }
</style>

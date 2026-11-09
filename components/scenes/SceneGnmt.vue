<!--
  SceneGnmt.vue — Traducción automática neuronal multilingüe (Johnson et al., 2017).
  Codificador → vector compartido → decodificador que emite la traducción token por token.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { heat, seeded } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'

const SRC = ['El', 'gato', 'duerme']
const TGT = ['The', 'cat', 'sleeps']
const rand = seeded(7)
const VECTOR = Array.from({ length: 12 }, () => heat(rand()))

const frame = useFrameLoop(11, 550)
const enc = computed(() => Math.min(3, frame.value + 1))
const vec = computed(() => frame.value >= 3)
const dec = computed(() => Math.max(0, Math.min(3, frame.value - 3)))
</script>

<template>
  <IoPanels :notes="['oración', 'codificador → vector → decodificador', 'traducción']">
    <template #input>
      <div class="sent">
        <span v-for="w in SRC" :key="w" class="tok">{{ w }}</span>
      </div>
    </template>

    <template #model>
      <div class="seq">
        <div class="stack">
          <span v-for="n in 3" :key="n" class="blk" :class="{ on: n <= enc }" />
        </div>
        <div class="vector" :class="{ on: vec }">
          <i v-for="(c, i) in VECTOR" :key="i" :style="{ background: vec ? c : 'var(--page)' }" />
        </div>
        <div class="stack">
          <span v-for="n in 3" :key="n" class="blk dec" :class="{ on: n <= dec }" />
        </div>
      </div>
    </template>

    <template #output>
      <div class="sent">
        <span v-for="(w, i) in TGT" :key="w" class="tok out" :class="{ show: i < dec }">{{ w }}</span>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.sent { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.tok {
  padding: 2px 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}
.tok.out { visibility: hidden; color: var(--crimson); font-weight: 700; }
.tok.out.show { visibility: visible; }

.seq { display: flex; align-items: center; gap: 22px; }
.stack { display: flex; flex-direction: column; gap: 8px; }
.blk { width: 64px; height: 28px; background: var(--page); box-shadow: 0 0 0 2px var(--vellum); }
.blk.on { background: var(--vermilion); box-shadow: 0 0 0 2px var(--ink); }
.blk.dec.on { background: var(--crimson); }
.vector { display: grid; grid-template-columns: repeat(2, 14px); gap: 2px; padding: 4px; box-shadow: 0 0 0 2px var(--vellum); }
.vector.on { box-shadow: 0 0 0 2px var(--ink); }
.vector i { width: 14px; height: 14px; }
</style>

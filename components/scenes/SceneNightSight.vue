<!--
  SceneNightSight.vue — Fotografía nocturna computacional (Liba et al., 2019).
  Una ráfaga de cuadros oscuros y ruidosos se alinea y promedia; el ruido baja con cada cuadro fusionado.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { seeded } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'
import PixelArt from '../PixelArt.vue'

const SCENE = [
  'KKKKKKKKKKKKKKKKKKKKKKKK',
  'KKKKKKKKKKKKKKKKKKKYYKKK',
  'KKKKKVKKKKKKKKKKKKYYYYKK',
  'KKKKKKKKKKKKKKKKKKYYYYKK',
  'KKKKKKKKKKKVKKKKKKKYYKKK',
  'KKKKKKKKKKKKKKKKKKKKKKKK',
  'KKKKKKKOOKKKKKKKKKKKKKKK',
  'KKKKKKOOOOKKKKKKKKKVKKKK',
  'KKKKKOOOOOOKKKKKKKKKKKKK',
  'KKKKOOOOOOOOKKKKKKKKKKKK',
  'KKKKKBBBBBBKKKKKKKKKKKKK',
  'KKKKKBYYBBBKKKKKKKKKKKKK',
  'KKKKKBYYBIIKKKKKKKKKKKKK',
  'KKKKKBBBBIIKKKKKKKKKKKKK',
  'IIIIIIIIIIIIIIIIIIIIIIII',
  'IIIIIIIIIIIIIIIIIIIIIIII',
]
const COLORS = { B: 'var(--brick)' }
const DARK = { Y: 'O', O: 'I', B: 'I', V: 'K', I: 'I', K: 'K' }

// Darken, then replace a fraction of pixels with noise
function noisy(seed, amount) {
  const r = seeded(seed)
  return SCENE.map(row => [...row].map(ch => (r() < amount ? (r() < 0.5 ? 'M' : 'V') : amount > 0 ? DARK[ch] : ch)).join(''))
}
const BURST = [1, 2, 3, 4].map(s => noisy(s, 0.35))
const OFFSETS = [[0, 0], [6, 4], [12, 8], [18, 12]]

const frame = useFrameLoop(9, 600)
const merged = computed(() => Math.min(4, frame.value + 1))
const result = computed(() => (merged.value >= 4 && frame.value >= 4 ? SCENE : noisy(10 + merged.value, 0.35 / merged.value)))
const offset = k => (k < merged.value ? [0, 0] : OFFSETS[k])
</script>

<template>
  <IoPanels :notes="['ráfaga de fotos', 'alinear y promediar', 'foto final']">
    <template #input>
      <div class="burst">
        <PixelArt v-for="(f, k) in BURST" :key="k" :grid="f" :scale="3" :colors="COLORS" class="frame"
          :style="{ left: `${OFFSETS[k][0]}px`, top: `${OFFSETS[k][1]}px` }" />
      </div>
    </template>

    <template #model>
      <div class="merge">
        <div class="stack">
          <PixelArt v-for="(f, k) in BURST" :key="k" :grid="f" :scale="4" :colors="COLORS" class="frame"
            :style="{ left: `${offset(k)[0] * 1.5}px`, top: `${offset(k)[1] * 1.5}px`, opacity: k < merged ? 0.25 : 1 }" />
        </div>
        <span class="count">{{ merged }} / 4</span>
      </div>
    </template>

    <template #output>
      <PixelArt :grid="result" :scale="7" :colors="COLORS" class="photo" />
    </template>
  </IoPanels>
</template>

<style scoped>
.burst { position: relative; width: 96px; height: 60px; }
.frame { position: absolute; box-shadow: 0 0 0 2px var(--ink); }
.merge { display: flex; align-items: center; gap: 24px; }
.stack { position: relative; width: 124px; height: 82px; }
.count { font-family: 'VT323', monospace; font-size: 28px; color: var(--oxblood); }
.photo { box-shadow: 0 0 0 2px var(--ink); }
</style>

<!--
  ControlOrb.vue — Emblema del hilo visual de Camino I.
  level 0: el orbe arrastra al escriba (caótico, carmesí) · level 4: orbita bajo control (oro/salvia).
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../utils/frameLoop'
import { line, seeded } from '../utils/pixel'
import PixelCharacter from './PixelCharacter.vue'

const props = defineProps({
  level: { type: Number, default: 0 },
})

const FRAMES = 8
const HAND = [14, 11]
const ANCHOR = [30, 8]
const ORBIT_CENTER = [26, 9]
const ORBIT = [[0, -4], [3, -3], [4, 0], [3, 3], [0, 4], [-3, 3], [-4, 0], [-3, -3]]
const JITTER = [5, 3, 2, 1, 0]
const COLORS = ['var(--crimson)', 'var(--vermilion)', 'var(--brick)', 'var(--gold)', 'var(--gold)']

const rand = seeded(11)
const OFFSETS = Array.from({ length: FRAMES }, () => [rand() * 2 - 1, rand() * 2 - 1])

const frame = useFrameLoop(FRAMES, 300)
const lvl = computed(() => Math.max(0, Math.min(4, props.level)))
const color = computed(() => COLORS[lvl.value])

const orb = computed(() => {
  if (lvl.value === 4) {
    const [dx, dy] = ORBIT[frame.value]
    return [ORBIT_CENTER[0] + dx, ORBIT_CENTER[1] + dy]
  }
  const amp = JITTER[lvl.value]
  const [ox, oy] = OFFSETS[frame.value]
  return [ANCHOR[0] + Math.round(ox * amp), ANCHOR[1] + Math.round(oy * amp)]
})

const tether = computed(() => (lvl.value === 4 ? [] : line(HAND[0], HAND[1], orb.value[0], orb.value[1]).slice(1, -1)))

// Sólo en nivel 0 el escriba es arrastrado hacia el orbe
const drag = computed(() => (lvl.value === 0 && frame.value % 2 === 1 ? 3 : 0))

const sparks = computed(() => {
  const n = 4 - lvl.value
  return Array.from({ length: n }, (_, i) => {
    const [ox, oy] = OFFSETS[(frame.value + i * 3) % FRAMES]
    return [orb.value[0] + Math.round(ox * 4), orb.value[1] + Math.round(oy * 4)]
  })
})
</script>

<template>
  <div class="control-orb" aria-hidden="true">
    <PixelCharacter who="scribe" facing="right" class="co-scribe" :style="{ transform: `translateX(${drag}px)` }" />
    <svg viewBox="0 0 40 20" width="120" height="60" shape-rendering="crispEdges" class="co-svg">
      <g v-if="lvl === 4" class="co-ring">
        <rect v-for="(o, i) in ORBIT" :key="`r${i}`" :x="ORBIT_CENTER[0] + o[0]" :y="ORBIT_CENTER[1] + o[1]" width="1" height="1" />
      </g>
      <rect v-for="(p, i) in tether" :key="`t${i}`" :x="p[0]" :y="p[1]" width="1" height="1" :fill="color" />
      <rect v-for="(s, i) in sparks" :key="`s${i}`" :x="s[0]" :y="s[1]" width="1" height="1" fill="var(--vermilion)" />
      <rect :x="orb[0] - 1" :y="orb[1] - 1" width="3" height="3" fill="var(--ink)" />
      <rect :x="orb[0]" :y="orb[1]" width="1" height="1" :fill="lvl === 4 ? 'var(--card)' : color" />
    </svg>
  </div>
</template>

<style scoped>
.control-orb {
  position: relative;
  width: 120px;
  height: 60px;
}

.co-scribe {
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
}

.co-svg {
  position: absolute;
  inset: 0;
  overflow: visible;
}

.co-ring rect {
  fill: var(--sage);
}
</style>

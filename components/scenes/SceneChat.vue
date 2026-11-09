<!--
  SceneChat.vue — Asistentes de chat (Ouyang et al., 2022).
  El modelo propone candidatos con probabilidad, elige uno y lo agrega al texto, token por token.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'
import PixelCauldron from '../PixelCauldron.vue'

const PROMPT = 'La capital de Guatemala es'
// Illustrative distributions; the first candidate is chosen
const STEPS = [
  [['Ciudad', 0.82], ['Antigua', 0.09], ['una', 0.04]],
  [['de', 0.96], ['capital', 0.02], [',', 0.01]],
  [['Guatemala', 0.97], ['México', 0.01], ['Panamá', 0.01]],
  [['.', 0.91], [',', 0.06], ['y', 0.02]],
]
const PER_STEP = 3

const frame = useFrameLoop(STEPS.length * PER_STEP + 3, 600)

const step = computed(() => Math.min(STEPS.length - 1, Math.floor(frame.value / PER_STEP)))
const phase = computed(() => (frame.value >= STEPS.length * PER_STEP ? PER_STEP - 1 : frame.value % PER_STEP))
const cands = computed(() => STEPS[step.value])
const picked = computed(() => phase.value >= 1)
const emitted = computed(() => {
  const done = step.value + (phase.value === PER_STEP - 1 ? 1 : 0)
  return STEPS.slice(0, done).map(s => s[0][0])
})
const outText = computed(() => emitted.value.map(t => (t === '.' ? t : ` ${t}`)).join(''))
const units = p => Math.max(1, Math.round(p * 25))
</script>

<template>
  <IoPanels :notes="['instrucción', 'siguiente token', 'texto generado']">
    <template #input>
      <div class="bubble">{{ PROMPT }}</div>
    </template>

    <template #model>
      <div class="lm">
        <PixelCauldron class="pot" />
        <ul class="cands">
          <li v-for="(c, i) in cands" :key="`${step}-${i}`" :class="{ win: picked && i === 0 }">
            <span class="tok">{{ c[0] }}</span>
            <span class="bar"><i :style="{ width: `${units(c[1]) * 4}px` }" /></span>
            <span class="pct">{{ Math.round(c[1] * 100) }}%</span>
          </li>
        </ul>
      </div>
    </template>

    <template #output>
      <div class="bubble out">
        <span class="dim">{{ PROMPT }}</span><span class="gen">{{ outText }}</span><span class="cursor" />
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.bubble {
  padding: 10px 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  line-height: 1.35;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}
.out { width: 100%; min-height: 120px; }
.dim { color: var(--muted); }
.gen { color: var(--crimson); font-weight: 700; }
.cursor {
  display: inline-block;
  width: 8px;
  height: 14px;
  margin-left: 2px;
  vertical-align: -2px;
  background: var(--ink);
  animation: blink 0.8s steps(1, end) infinite;
}
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
}

.lm { display: flex; align-items: center; gap: 18px; }
.pot { width: 120px; }
.cands { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; list-style: none; }
.cands li { display: grid; grid-template-columns: 64px 104px 36px; align-items: center; gap: 6px; margin: 0; }
.tok {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  text-align: right;
  color: var(--ink);
}
.bar { height: 10px; background: var(--vellum); }
.bar i { display: block; height: 100%; background: var(--vermilion); }
.pct { font-family: 'VT323', monospace; font-size: 18px; color: var(--muted); }
.win .tok { color: var(--crimson); font-weight: 700; }
.win .bar i { background: var(--crimson); }
.win .pct { color: var(--crimson); }

@media (prefers-reduced-motion: reduce) {
  .cursor { animation: none; }
}
</style>

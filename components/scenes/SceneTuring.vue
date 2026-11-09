<!--
  SceneTuring.vue — Juego de imitación (Turing, 1950).
  La pregunta y la respuesta errónea "105621" provienen del artículo original.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'

const frame = useFrameLoop(13, 600)

const typing = computed(() => frame.value >= 1 && frame.value <= 3)
const dots = computed(() => '.'.repeat((frame.value % 3) + 1))
const answerA = computed(() => frame.value >= 4)
const answerB = computed(() => frame.value >= 5)
const pick = computed(() => (frame.value >= 6 && frame.value < 12 ? (frame.value % 2 ? 'A' : 'B') : null))
</script>

<template>
  <IoPanels :notes="['pregunta', 'dos respuestas ocultas', 'veredicto']">
    <template #input>
      <div class="ask">¿Cuánto es 34957 + 70764?</div>
    </template>

    <template #model>
      <div class="room">
        <div v-for="(t, i) in ['A', 'B']" :key="t" class="term">
          <span class="tag label">{{ t }}</span>
          <div class="screen">
            <template v-if="typing">{{ dots }}</template>
            <template v-else-if="i === 0 && answerA">105621</template>
            <template v-else-if="i === 1 && answerB">105721</template>
          </div>
          <div class="base" />
        </div>
        <div class="curtain" />
      </div>
    </template>

    <template #output>
      <div class="verdict">
        <span class="q">¿Humano o máquina?</span>
        <div class="choices">
          <span v-for="t in ['A', 'B']" :key="t" class="choice" :class="{ on: pick === t }">{{ t }}</span>
        </div>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.ask {
  padding: 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}

.room { position: relative; display: flex; gap: 48px; padding: 0 24px; }
.term { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.tag { color: var(--brick); }
.screen {
  width: 112px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'VT323', monospace;
  font-size: 28px;
  color: var(--gold);
  background: var(--ink);
  box-shadow: 0 0 0 4px var(--border);
}
.base { width: 40px; height: 8px; background: var(--border); }
.curtain {
  position: absolute;
  inset: -16px auto -16px 50%;
  width: 12px;
  transform: translateX(-50%);
  background: repeating-linear-gradient(var(--oxblood) 0 4px, var(--crimson) 4px 8px);
}

.verdict { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.q { font-family: 'VT323', monospace; font-size: 26px; color: var(--oxblood); text-align: center; line-height: 1; }
.choices { display: flex; gap: 16px; }
.choice {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'VT323', monospace;
  font-size: 32px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}
.choice.on { color: var(--card); background: var(--crimson); }
</style>

<!--
  SceneExplicar.vue — Slide M-06 (cierre de Camino I).
  Ciclo Pensar → Preguntar → Verificar → Explicar; en el centro, mago y escriba con el orbe orbitando bajo control.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { line } from '../../utils/pixel'
import PixelCharacter from '../PixelCharacter.vue'
import PixelIcon from '../PixelIcon.vue'

const SCALE = 4
const NODES = [
  { name: 'Pensar', icon: 'eye', c: [65, 8] },
  { name: 'Preguntar', icon: 'chat', c: [110, 37] },
  { name: 'Verificar', icon: 'search', c: [65, 67] },
  { name: 'Explicar', icon: 'book', c: [20, 37] },
]

// Recorrido del rombo como lista de celdas (sin repetir vértices)
const PATH = NODES.flatMap((n, i) => {
  const m = NODES[(i + 1) % NODES.length]
  return line(n.c[0], n.c[1], m.c[0], m.c[1]).slice(0, -1)
})
const DOTS = PATH.filter((_, i) => i % 3 === 0)

const ORBIT_C = [65, 37]
const ORBIT = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  return [ORBIT_C[0] + Math.round(Math.cos(a) * 24), ORBIT_C[1] + Math.round(Math.sin(a) * 14)]
})

const FRAMES = 16
const frame = useFrameLoop(FRAMES, 350)
const active = computed(() => Math.floor(frame.value / (FRAMES / NODES.length)))
const token = computed(() => PATH[Math.floor((frame.value / FRAMES) * PATH.length)])
const orb = computed(() => ORBIT[frame.value % ORBIT.length])
</script>

<template>
  <div class="explain-scene">
    <div class="stage">
      <svg viewBox="0 0 130 75" :width="130 * SCALE" :height="75 * SCALE" shape-rendering="crispEdges" class="loop-ring" aria-hidden="true">
        <rect v-for="(d, i) in DOTS" :key="`d${i}`" :x="d[0]" :y="d[1]" width="1" height="1" fill="var(--gold)" />
        <rect v-for="(o, i) in ORBIT" :key="`o${i}`" :x="o[0]" :y="o[1]" width="1" height="1" fill="var(--sage)" />
        <rect :x="token[0] - 1" :y="token[1] - 1" width="3" height="3" fill="var(--ink)" />
        <rect :x="token[0]" :y="token[1]" width="1" height="1" fill="var(--gold)" />
        <rect :x="orb[0] - 1" :y="orb[1] - 1" width="3" height="3" fill="var(--ink)" />
        <rect :x="orb[0]" :y="orb[1]" width="1" height="1" fill="var(--card)" />
      </svg>

      <div class="duo">
        <PixelCharacter who="mage" facing="right" class="duo-px" />
        <PixelCharacter who="scribe" facing="left" class="duo-px" />
      </div>

      <div
        v-for="(n, i) in NODES"
        :key="n.name"
        class="node"
        :class="{ on: active === i }"
        :style="{ left: `${n.c[0] * SCALE}px`, top: `${n.c[1] * SCALE}px` }"
      >
        <PixelIcon :name="n.icon" class="n-icon" />
        <span>{{ i + 1 }} · {{ n.name }}</span>
      </div>
    </div>

    <div class="rule">
      <span class="label">Regla de trabajo</span>
      <p>Antes de entregar, explica cada línea sin ayuda, como en el pizarrón.</p>
      <p class="sub">Si no puedes, vuelve al paso 1.</p>
    </div>
  </div>
</template>

<style scoped>
.explain-scene {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
}

.stage {
  position: relative;
  width: 520px;
  height: 300px;
  flex: none;
}

.loop-ring {
  position: absolute;
  inset: 0;
}

.duo {
  position: absolute;
  left: 260px;
  top: 148px;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 8px;
}

.duo-px {
  width: 64px;
}

.node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--muted);
  background: var(--card);
  box-shadow: 0 0 0 2px var(--vellum);
}

.node.on {
  color: var(--ink);
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 var(--gold);
}

.n-icon {
  width: 16px;
  color: var(--oxblood);
}

.node.on .n-icon {
  color: var(--sage);
}

.rule {
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: var(--card);
  box-shadow: 0 0 0 3px var(--sage), 4px 4px 0 3px var(--vellum);
}

.rule .label {
  font-size: 10px;
  color: var(--brick);
}

.rule p {
  margin: 0;
  font-size: 17px;
  line-height: 1.25;
  color: var(--ink);
}

.rule .sub {
  font-size: 13px;
  color: var(--oxblood);
}
</style>

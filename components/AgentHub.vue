<!--
  AgentHub.vue — Agente con herramientas (Yao et al., 2023; Schick et al., 2023).
  Acciones disparadas desde el modelo hacia sistemas reales: algunas aciertan (sage), otras fallan (carmesí).
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../utils/frameLoop'
import PixelCauldron from './PixelCauldron.vue'
import PixelCharacter from './PixelCharacter.vue'
import PixelIcon from './PixelIcon.vue'

const W = 680
const H = 270
const CX = W / 2
const CY = H / 2 + 6
const TOOLS = [
  { icon: 'gear', label: 'API' },
  { icon: 'db', label: 'Base de datos' },
  { icon: 'mail', label: 'Correo' },
  { icon: 'ticket', label: 'Tickets' },
  { icon: 'doc', label: 'Reportes' },
].map((t, i) => {
  const a = -Math.PI / 2 + i * 2 * Math.PI / 5
  return { ...t, x: Math.round(CX + Math.cos(a) * 270), y: Math.round(CY + Math.sin(a) * 104) }
})
const ACTIONS = [
  { tool: 0, hit: true },
  { tool: 1, hit: true },
  { tool: 3, hit: false },
  { tool: 2, hit: true },
  { tool: 4, hit: false },
  { tool: 1, hit: false },
]
const PER = 3

const frame = useFrameLoop(ACTIONS.length * PER, 380)
const k = computed(() => Math.floor(frame.value / PER))
const step = computed(() => frame.value % PER)
const act = computed(() => ACTIONS[k.value])
const shot = computed(() => {
  const t = TOOLS[act.value.tool]
  const miss = act.value.hit ? 0 : 1
  const f = (step.value + 1) / PER
  const tx = t.x + miss * 38
  const ty = t.y - miss * 30
  return { x: Math.round((CX + (tx - CX) * f) / 4) * 4, y: Math.round((CY + (ty - CY) * f) / 4) * 4 }
})
const landed = computed(() => step.value === PER - 1)
const tally = computed(() => ACTIONS.slice(0, k.value + (landed.value ? 1 : 0)))
const toolState = i => (landed.value && act.value.tool === i ? (act.value.hit ? 'hit' : 'miss') : '')
</script>

<template>
  <div class="hub-wrap">
    <div class="hub" :style="{ width: `${W}px`, height: `${H}px` }">
      <div class="core" :style="{ left: `${CX}px`, top: `${CY}px` }">
        <PixelCauldron class="pot" />
      </div>
      <PixelCharacter who="mage" facing="right" class="caster" :style="{ left: `${CX - 112}px`, top: `${CY - 64}px` }" />

      <div v-for="(t, i) in TOOLS" :key="t.label" class="tool" :class="toolState(i)" :style="{ left: `${t.x}px`, top: `${t.y}px` }">
        <PixelIcon :name="t.icon" class="ico" />
        <span>{{ t.label }}</span>
      </div>

      <span class="shot" :class="{ miss: landed && !act.hit }" :style="{ left: `${shot.x}px`, top: `${shot.y}px` }" />
    </div>

    <div class="tally">
      <span v-for="(a, i) in tally" :key="i" class="mark" :class="a.hit ? 'ok' : 'ko'" />
    </div>
  </div>
</template>

<style scoped>
.hub-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding-bottom: 1.5rem; }
.hub { position: relative; }
.core { position: absolute; transform: translate(-50%, -50%); }
.pot { width: 120px; }
.caster { position: absolute; width: 64px; }

.tool {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  font-size: 13px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 2px var(--vellum);
}
.tool .ico { width: 32px; height: 32px; color: var(--ink); }
.tool.hit { background: var(--sage); }
.tool.miss { box-shadow: 0 0 0 3px var(--crimson), 3px 3px 0 3px var(--vellum); }

.shot { position: absolute; width: 10px; height: 10px; transform: translate(-50%, -50%); background: var(--vermilion); box-shadow: 0 0 0 2px var(--ink); }
.shot.miss { background: var(--crimson); width: 14px; height: 14px; }

.tally { display: flex; gap: 6px; min-height: 12px; }
.mark { width: 12px; height: 12px; box-shadow: 0 0 0 2px var(--ink); }
.mark.ok { background: var(--sage); }
.mark.ko { background: var(--crimson); }
</style>

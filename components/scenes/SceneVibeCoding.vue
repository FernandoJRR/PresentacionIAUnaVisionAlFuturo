<!--
  SceneVibeCoding.vue — Slide T-02 (Nivel 1: demo-vibecoded).
  El taller sin estanterías ni /init: el escriba no tiene espacio de trabajo ni libros de reglas,
  mientras el mago y el caldero hirviendo lanzan chispas caóticas que apilan el monolito server.js (365 LOC).
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { seeded } from '../../utils/pixel'
import PixelCauldron from '../PixelCauldron.vue'
import PixelCharacter from '../PixelCharacter.vue'
import PixelIcon from '../PixelIcon.vue'

const rand = seeded(7)
const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  x0: 196 + Math.round(rand() * 34),
  y0: 108 + Math.round((rand() - 0.5) * 36),
  x1: 310 + Math.round(rand() * 110),
  y1: 28 + (i % 7) * 26,
  arc: Math.round((rand() - 0.5) * 60),
  color: i % 2 === 0 ? 'var(--crimson)' : 'var(--vermilion)',
}))

const CHUNKS = [
  { tag: 'http.createServer()', sub: 'CORS + parseBody manual', loc: '48 LOC', jitter: -4 },
  { tag: 'if (path === "/api/usuarios")', sub: 'SQL directo en ruta', loc: '55 LOC', jitter: 6 },
  { tag: 'if (path === "/api/mesas")', sub: 'Validación if/else cruda', loc: '49 LOC', jitter: -6 },
  { tag: 'if (path === "/api/platos")', sub: 'Sin esquemas ni tipos', loc: '68 LOC', jitter: 5 },
  { tag: 'if (path === "/api/comandas")', sub: 'Transacción + joins acoplados', loc: '145 LOC', jitter: -3 },
]

const frame = useFrameLoop(12, 360)
const t = computed(() => (frame.value % 6) / 5)
const snap = v => Math.round(v / 4) * 4

const flyingSparks = computed(() =>
  SPARKS.map((s, i) => {
    const p = ((t.value + i * 0.17) % 1)
    const x = snap(s.x0 + (s.x1 - s.x0) * p)
    const y = snap(s.y0 + (s.y1 - s.y0) * p + Math.sin(p * Math.PI) * s.arc)
    return { x, y, c: s.color }
  }),
)

const mageJitter = computed(() => (frame.value % 2 === 0 ? -3 : 3))
const fakeBlink = computed(() => frame.value % 3 === 0)
</script>

<template>
  <div class="vibe-scene">
    <!-- Panel Izquierdo: Entorno Vacío + Generación sin Guía -->
    <div class="caster-zone">
      <div class="env-badge">
        <span class="label">Entorno Inicial</span>
        <code>Carpeta vacía · Sin /init · Sin estructura</code>
      </div>

      <div class="chaos-stage">
        <!-- Espacio sin configuración inicial -->
        <div class="empty-scribe-slot">
          <span class="slot-lbl">Sin /init</span>
          <PixelCharacter who="scribe" facing="right" class="idle-scribe" />
          <span class="slot-sub">Sin estructura</span>
        </div>

        <!-- Generación sin restricciones -->
        <div class="mage-cauldron-pair">
          <div class="mage-wrap" :style="{ transform: `translateY(${mageJitter}px)` }">
            <PixelCharacter who="mage" facing="right" class="mage-sprite" />
          </div>
          <PixelCauldron class="pot-sprite" />
        </div>

        <!-- Chispas caóticas en el lienzo -->
        <span
          v-for="(s, i) in flyingSparks"
          :key="i"
          class="wild-spark"
          :style="{ left: `${s.x}px`, top: `${s.y}px`, background: s.c }"
        />
      </div>

      <div class="env-note">
        Sin estructura inicial ni contexto, el prompt <code>"API de Javascript"</code> genera CommonJS crudo en un solo archivo
      </div>
    </div>

    <!-- Panel Central: Monolito server.js -->
    <div class="monolith-zone">
      <div class="mono-header">
        <PixelIcon name="code" />
        <code>src/server.js</code>
        <span class="loc-pill">365 LOC · 1 archivo</span>
      </div>

      <div class="mono-stack">
        <div
          v-for="(c, i) in CHUNKS"
          :key="c.tag"
          class="mono-block"
          :style="{ transform: `translateX(${c.jitter + (frame % 2 === i % 2 ? 2 : -2)}px)` }"
        >
          <div class="mb-top">
            <code>{{ c.tag }}</code>
            <span class="mb-loc">{{ c.loc }}</span>
          </div>
          <span class="mb-sub">{{ c.sub }}</span>
        </div>
      </div>

      <div class="mono-foot">
        <span>+ <code>src/db.js</code> (SQLite crudo) · 0 capas · 0 TypeScript</span>
      </div>
    </div>

    <!-- Panel Derecho: Falso Test -->
    <div class="test-zone">
      <div class="test-card" :class="{ warn: fakeBlink }">
        <div class="tc-head">
          <span class="label">Ilusión de Pruebas</span>
          <code>test/api.test.js</code>
        </div>

        <div class="tc-code">
          <code>console.log('[GET /api/usuarios]', ...)</code>
          <code>console.log('[POST /api/comandas]', ...)</code>
          <code>console.log('TODAS LAS PRUEBAS CON ÉXITO')</code>
          <code>process.exit(0)</code>
        </div>

        <div class="tc-metrics">
          <div class="metric bad">
            <span class="m-val">0</span>
            <span class="m-lbl">assert() reales</span>
          </div>
          <div class="metric bad">
            <span class="m-val">0%</span>
            <span class="m-lbl">reglas / linter</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vibe-scene {
  width: 100%;
  display: grid;
  grid-template-columns: 1.15fr 1.1fr 0.85fr;
  align-items: stretch;
  gap: 12px;
}

.caster-zone {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--vellum);
  overflow: hidden;
}

.env-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--crimson);
  z-index: 2;
}

.env-badge .label {
  font-size: 9px;
  color: var(--crimson);
}

.env-badge code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--ink);
}

.chaos-stage {
  position: relative;
  height: 172px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.empty-scribe-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 8px;
  border: 2px dashed var(--muted);
  background: var(--page);
  opacity: 0.55;
}

.slot-lbl {
  font-family: 'Silkscreen', monospace;
  font-size: 8px;
  text-transform: uppercase;
  color: var(--muted);
}

.idle-scribe {
  width: 48px;
}

.slot-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  color: var(--muted);
}

.mage-cauldron-pair {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding-right: 12px;
}

.mage-sprite {
  width: 64px;
}

.pot-sprite {
  width: 100px;
}

.wild-spark {
  position: absolute;
  width: 10px;
  height: 10px;
  box-shadow: 0 0 0 2px var(--ink);
  pointer-events: none;
}

.env-note {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  line-height: 1.3;
  color: var(--oxblood);
  background: var(--page);
  padding: 5px 8px;
  box-shadow: 0 0 0 1px var(--border);
  z-index: 2;
}

.monolith-zone {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--card);
  box-shadow: 0 0 0 3px var(--crimson), 4px 4px 0 2px var(--vellum);
}

.mono-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--crimson);
  border-bottom: 2px dashed var(--vellum);
  padding-bottom: 5px;
}

.loc-pill {
  margin-left: auto;
  padding: 1px 6px;
  font-size: 10px;
  background: var(--crimson);
  color: var(--card);
}

.mono-stack {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 6px 4px;
}

.mono-block {
  padding: 4px 8px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--oxblood);
  transition: transform 0.15s steps(1, end);
}

.mb-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--ink);
}

.mb-loc {
  font-size: 9.5px;
  color: var(--crimson);
}

.mb-sub {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--muted);
}

.mono-foot {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  text-align: center;
  color: var(--muted);
  border-top: 1px solid var(--vellum);
  padding-top: 4px;
}

.test-zone {
  display: flex;
  flex-direction: column;
}

.test-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--vellum);
}

.test-card.warn {
  box-shadow: 0 0 0 3px var(--vermilion), 4px 4px 0 2px var(--vellum);
}

.tc-head {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-bottom: 2px dashed var(--vellum);
  padding-bottom: 5px;
}

.tc-head .label {
  font-size: 9px;
  color: var(--vermilion);
}

.tc-head code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 700;
}

.tc-code {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: var(--page);
  box-shadow: 0 0 0 1px var(--border);
}

.tc-code code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tc-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 4px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--crimson);
}

.m-val {
  font-family: 'VT323', monospace;
  font-size: 26px;
  line-height: 1;
  color: var(--crimson);
}

.m-lbl {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--ink);
}
</style>

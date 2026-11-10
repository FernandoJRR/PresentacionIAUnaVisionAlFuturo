<!--
  SceneExperimentSetup.vue — Slide T-01: El Laboratorio Experimental.
  El escriba y el mago frente al atril con comedor.dbml y el prompt invariante,
  mostrando las 4 salas de trabajo (del suelo caótico a la biblioteca modular).
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { BOOK_TOMO_GRID, LECTERN_GRID, MEGA_TOME_GRID, SCROLL_GRID } from '../../utils/workshopSprites'
import PixelArt from '../PixelArt.vue'
import PixelCauldron from '../PixelCauldron.vue'
import PixelCharacter from '../PixelCharacter.vue'
import PixelIcon from '../PixelIcon.vue'

const TABLES = ['usuarios', 'mesas', 'categorias', 'platos', 'comandas', 'comanda_detalles']

const frame = useFrameLoop(12, 420)
const activeRoom = computed(() => Math.floor(frame.value / 3) % 4)
const pulse = computed(() => frame.value % 2 === 0)
</script>

<template>
  <div class="setup-stage">
    <!-- Lado Izquierdo: Atril Maestro de Entrada Invariante -->
    <section class="lectern-zone">
      <div class="lz-head">
        <span class="label">Entrada Invariante (4 Corridas)</span>
        <span class="lz-tag">Mismo Prompt + Mismo DBML</span>
      </div>

      <!-- Escena de los personajes junto al Pergamino y el Atril -->
      <div class="sanctum-bench">
        <div class="char-col">
          <PixelCharacter who="scribe" facing="right" class="bench-char" />
          <span class="char-role">Define entorno</span>
        </div>

        <div class="altar-center">
          <div class="scroll-float" :class="{ up: pulse }">
            <PixelArt :grid="SCROLL_GRID" :scale="3" />
            <code>comedor.dbml</code>
          </div>
          <PixelArt :grid="LECTERN_GRID" :scale="3" />
        </div>

        <div class="char-col">
          <PixelCharacter who="mage" facing="left" class="bench-char" />
          <span class="char-role">Ejecuta prompt</span>
        </div>
      </div>

      <div class="table-strip">
        <span v-for="t in TABLES" :key="t" class="t-chip">{{ t }}</span>
      </div>

      <div class="prompt-scroll">
        <span class="label">Prompt idéntico en las 4 carpetas:</span>
        <p>"Genera una API de Javascript en base al archivo dbml en el folder del proyecto, confio en tu criterio así que no preguntes."</p>
      </div>
    </section>

    <!-- Lado Derecho: Las 4 Salas de Trabajo (Evolución Física del Taller) -->
    <section class="rooms-grid">
      <!-- Sala 1: Vibe Coding -->
      <div class="room-card r1" :class="{ active: activeRoom === 0 }">
        <div class="rc-top">
          <span class="rc-num">01</span>
          <div>
            <h3>Vibe Coding</h3>
            <code>Carpeta vacía · Sin /init</code>
          </div>
        </div>
        <div class="rc-diorama">
          <PixelCharacter who="mage" facing="right" class="mini-who" />
          <PixelCauldron style="width: 40px" />
          <div class="r1-pile">
            <span class="rock c1" />
            <span class="rock c2" />
            <span class="rock c3" />
          </div>
        </div>
        <div class="rc-foot">
          <span>Sin estructura inicial: <code>server.js</code> (365 LOC) · 0 assert</span>
        </div>
      </div>

      <!-- Sala 2: Probabilístico -->
      <div class="room-card r2" :class="{ active: activeRoom === 1 }">
        <div class="rc-top">
          <span class="rc-num">02</span>
          <div>
            <h3>Probabilístico</h3>
            <code>Paquetes TS + Librerías + /init</code>
          </div>
        </div>
        <div class="rc-diorama">
          <PixelCharacter who="scribe" facing="right" class="mini-who" />
          <div class="mini-shelf">
            <div class="ms-row">
              <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--gold)' }" />
              <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--gold)' }" />
              <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--crimson)' }" class="tilt-book" />
            </div>
            <div class="ms-plank" />
          </div>
          <PixelCharacter who="mage" facing="left" class="mini-who" />
        </div>
        <div class="rc-foot">
          <span>Estructura TS inicial, pero sin <code>services/</code> (238 LOC)</span>
        </div>
      </div>

      <!-- Sala 3: Determinista -->
      <div class="room-card r3" :class="{ active: activeRoom === 2 }">
        <div class="rc-top">
          <span class="rc-num">03</span>
          <div>
            <h3>Determinista</h3>
            <code>+ Coverage 90% + ArchUnit + ESLint</code>
          </div>
        </div>
        <div class="rc-diorama">
          <PixelArt :grid="LECTERN_GRID" :scale="2" />
          <div class="mini-shelf heavy">
            <PixelArt :grid="MEGA_TOME_GRID" :scale="2" />
            <div class="ms-plank bend" />
          </div>
          <PixelCharacter who="mage" facing="left" class="mini-who" />
        </div>
        <div class="rc-foot">
          <span>Atajo 1:1: 1 solo archivo <code>restaurant.controller.ts</code></span>
        </div>
      </div>

      <!-- Sala 4: Más Determinista -->
      <div class="room-card r4" :class="{ active: activeRoom === 3 }">
        <div class="rc-top">
          <span class="rc-num">04</span>
          <div>
            <h3>Más Determinista</h3>
            <code>+ max-lines: 250 · max-fn: 35</code>
          </div>
        </div>
        <div class="rc-diorama">
          <PixelCharacter who="scribe" facing="right" class="mini-who" />
          <div class="mini-library">
            <PixelArt v-for="n in 4" :key="n" :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--sage)' }" />
          </div>
          <PixelCharacter who="mage" facing="left" class="mini-who" />
        </div>
        <div class="rc-foot">
          <span>Arquitectura modular: 6 dominios + 16 suites <PixelIcon name="check" class="inline-chk" /></span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.setup-stage {
  width: 100%;
  display: grid;
  grid-template-columns: 0.96fr 1.34fr;
  align-items: stretch;
  gap: 14px;
}

.lectern-zone {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--vellum);
}

.lz-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px dashed var(--vellum);
  padding-bottom: 4px;
}

.lz-head .label {
  font-size: 9.5px;
  color: var(--brick);
}

.lz-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  background: var(--gold);
  color: var(--ink);
}

.sanctum-bench {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 8px 6px;
  background: var(--page);
  box-shadow: inset 0 0 0 2px var(--vellum);
}

.char-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bench-char {
  width: 64px;
}

.char-role {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--oxblood);
  font-weight: 700;
}

.altar-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.scroll-float {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: transform 0.15s steps(1, end);
}

.scroll-float.up {
  transform: translateY(-3px);
}

.scroll-float code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  color: var(--crimson);
}

.table-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.t-chip {
  padding: 1px 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  background: var(--page);
  color: var(--oxblood);
  box-shadow: 0 0 0 1px var(--border);
}

.prompt-scroll {
  padding: 6px 8px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--oxblood), inset 0 0 0 2px var(--gold);
}

.prompt-scroll .label {
  display: block;
  font-size: 8.5px;
  color: var(--crimson);
  margin-bottom: 2px;
}

.prompt-scroll p {
  margin: 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  line-height: 1.3;
  color: var(--ink);
}

/* Cuadrícula de las 4 Salas */
.rooms-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}

.room-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 7px 10px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--vellum);
  transition: transform 0.1s steps(1, end), box-shadow 0.1s steps(1, end);
}

.room-card.active {
  transform: translate(-2px, -2px);
}

.room-card.r1.active { box-shadow: 0 0 0 3px var(--crimson), 4px 4px 0 var(--vellum); }
.room-card.r2.active { box-shadow: 0 0 0 3px var(--vermilion), 4px 4px 0 var(--vellum); }
.room-card.r3.active { box-shadow: 0 0 0 3px var(--gold), 4px 4px 0 var(--vellum); }
.room-card.r4.active { box-shadow: 0 0 0 3px var(--sage), 4px 4px 0 var(--vellum); }

.rc-top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rc-num {
  font-family: 'VT323', monospace;
  font-size: 24px;
  line-height: 1;
  padding: 2px 6px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}

.rc-top h3 {
  font-size: 1.2rem;
  line-height: 1;
  margin: 0;
  color: var(--oxblood);
}

.rc-top code {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--muted);
}

.rc-diorama {
  height: 58px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 4px 8px;
  background: var(--page);
  box-shadow: inset 0 0 0 1px var(--vellum);
}

.mini-who {
  width: 32px;
}

.mini-pot {
  width: 40px;
}

.r1-pile {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rock {
  display: block;
  height: 8px;
  background: var(--crimson);
  box-shadow: 0 0 0 1px var(--ink);
}
.rock.c1 { width: 22px; transform: translateX(3px); }
.rock.c2 { width: 28px; background: var(--vermilion); }
.rock.c3 { width: 32px; }

.mini-shelf {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ms-row {
  display: flex;
  align-items: flex-end;
  gap: 3px;
}

.tilt-book {
  transform: rotate(12deg) translateY(-2px);
}

.ms-plank {
  width: 78px;
  height: 5px;
  background: var(--oxblood);
  box-shadow: 0 0 0 1px var(--ink);
}

.ms-plank.bend {
  background: var(--crimson);
  height: 6px;
}

.mini-library {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 3px 6px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--sage);
}

.rc-foot {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--ink);
  border-top: 1px dashed var(--vellum);
  padding-top: 3px;
}

.inline-chk {
  width: 11px;
  height: 11px;
  color: var(--sage);
}
</style>

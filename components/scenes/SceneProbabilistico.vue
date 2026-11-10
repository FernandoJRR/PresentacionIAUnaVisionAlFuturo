<!--
  SceneProbabilistico.vue — Slide T-03 (Nivel 2: demo-probabilistico).
  El escriba arma la primera estantería y coloca los 4 libros base (TS, Express, Zod, Supertest) + /init.
  El mago dirige sus haces a los estantes y crea 5 libros en controllers/, pero como no hay
  reglas deterministas: la repisa services/ queda vacía, el libro comandas.controller (238 LOC)
  se hincha y gotea directo al barril db.store.ts, y abajo solo hay 1 libro pequeño de test.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { BLOATED_BOOK_GRID, BOOK_TOMO_GRID, DB_BARREL_GRID, LECTERN_GRID } from '../../utils/workshopSprites'
import PixelArt from '../PixelArt.vue'
import PixelCharacter from '../PixelCharacter.vue'

const INIT_TOMES = [
  { name: 'TypeScript', color: 'var(--oxblood)' },
  { name: 'Express 5', color: 'var(--gold)' },
  { name: 'Zod 4', color: 'var(--sage)' },
  { name: 'Supertest', color: 'var(--vermilion)' },
]

const CTRL_BOOKS = [
  { name: 'usuarios', loc: '64', color: 'var(--gold)' },
  { name: 'mesas', loc: '72', color: 'var(--gold)' },
  { name: 'categorias', loc: '58', color: 'var(--gold)' },
  { name: 'platos', loc: '95', color: 'var(--vermilion)' },
]

const frame = useFrameLoop(12, 360)

// El escriba camina entre los tomos de /init (0..3)
const activeTome = computed(() => frame.value % 4)
const scribeY = computed(() => (frame.value % 2 === 0 ? -4 : 4))

// Rayos del mago hacia la estantería y goteras rojas desde comandas.controller (238 LOC) hacia db.store.ts
const beamStep = computed(() => frame.value % 6)
const dripY = computed(() => (frame.value % 4) * 14)
const testSlideX = computed(() => ((frame.value % 6) - 2.5) * 18)
</script>

<template>
  <div class="prob-stage">
    <!-- Zona Izquierda: Configuración de Estructura y /init -->
    <section class="scribe-work">
      <div class="zone-head">
        <span class="label">1 · Configuración de Estructura y Contexto</span>
        <code>Paquetes + /init</code>
      </div>

      <div class="desk-diorama">
        <!-- Paquetes base instalados -->
        <div class="init-rack">
          <div
            v-for="(t, i) in INIT_TOMES"
            :key="t.name"
            class="tome-slot"
            :class="{ lit: activeTome === i }"
          >
            <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: t.color }" />
            <span>{{ t.name }}</span>
          </div>
        </div>

        <!-- Personajes ejecutando tareas técnicas -->
        <div class="cast-floor">
          <div class="scribe-mover" :style="{ transform: `translateY(${scribeY}px)` }">
            <PixelCharacter who="scribe" facing="right" class="char-w" />
            <span class="act-tag">Coloca la estructura</span>
          </div>

          <div class="lectern-mid">
            <PixelArt :grid="LECTERN_GRID" :scale="2" />
            <code>/init</code>
          </div>

          <div class="mage-caster">
            <PixelCharacter who="mage" facing="right" class="char-w" />
            <span class="act-tag">Lee el contexto TS</span>
          </div>

          <!-- Flujo hacia la arquitectura -->
          <div class="magic-stream">
            <span
              v-for="n in 4"
              :key="n"
              class="stream-spark"
              :class="{ on: (beamStep + n) % 2 === 0 }"
            />
          </div>
        </div>
      </div>

      <div class="zone-foot">
        Aunque el prompt pedía <code>"Javascript"</code>, la estructura inicial e <code>/init</code> nos guían a escribir <strong>TypeScript + Zod</strong>
      </div>
    </section>

    <!-- Zona Derecha: Arquitectura Generada con Desborde en Controladores y Ausencia de services/ -->
    <section class="bookshelf-zone">
      <div class="zone-head">
        <span class="label">2 · Arquitectura Generada (Con estructura, pero aún con acoplamiento)</span>
        <code>src/com/marito/comedor/</code>
      </div>

      <div class="wooden-bookcase">
        <!-- CAPA 1: controllers/ (4 archivos normales + 1 archivo de 238 LOC) -->
        <div class="shelf-tier">
          <div class="tier-label">
            <code>controllers/</code>
            <span class="tier-sub">5 archivos creados</span>
          </div>

          <div class="books-row">
            <div v-for="b in CTRL_BOOKS" :key="b.name" class="book-item">
              <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: b.color }" />
              <code>{{ b.name }}</code>
              <span class="b-loc">{{ b.loc }}L</span>
            </div>

            <!-- Archivo acoplado: comandas.controller.ts (238 LOC) -->
            <div class="bloated-item" :class="{ shake: frame % 2 === 0 }">
              <PixelArt :grid="BLOATED_BOOK_GRID" :scale="2" />
              <div class="bloat-info">
                <code>comandas.controller.ts</code>
                <span class="bloat-badge">238 LOC · Lógica acoplada</span>
              </div>
            </div>
          </div>
          <div class="wooden-plank cracked" />
        </div>

        <!-- CAPA 2: services/ (OMITIDA — comandas.controller muta directo db.store.ts) -->
        <div class="shelf-tier empty-tier">
          <div class="tier-label">
            <code>services/</code>
            <span class="tier-sub bad">Capa no generada</span>
          </div>

          <div class="void-space">
            <span class="cobweb-msg">Sin reglas de arquitectura, el controlador concentra la lógica y muta los datos directo</span>

            <!-- Acoplamiento directo desde comandas.controller hasta db.store.ts -->
            <div class="leak-column">
              <span class="leak-drop" :style="{ top: `${dripY}px` }" />
              <span class="leak-drop d2" :style="{ top: `${(dripY + 22) % 44}px` }" />
            </div>

            <div class="barrel-box">
              <PixelArt :grid="DB_BARREL_GRID" :scale="2" />
              <code>db.store.ts</code>
            </div>
          </div>
          <div class="wooden-plank dashed" />
        </div>

        <!-- CAPA 3: __tests__/ (1 solo archivo de test global) -->
        <div class="shelf-tier">
          <div class="tier-label">
            <code>__tests__/</code>
            <span class="tier-sub">Sin umbral de coverage</span>
          </div>

          <div class="lonely-test-row">
            <div class="sliding-test" :style="{ transform: `translateX(${testSlideX}px)` }">
              <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--gold)' }" />
              <div class="st-copy">
                <code>comedor.test.ts</code>
                <span>1 solo test global para las 5 entidades</span>
              </div>
            </div>
          </div>
          <div class="wooden-plank" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.prob-stage {
  width: 100%;
  display: grid;
  grid-template-columns: 0.92fr 1.38fr;
  align-items: stretch;
  gap: 14px;
}

.scribe-work,
.bookshelf-zone {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--vellum);
}

.zone-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px dashed var(--vellum);
  padding-bottom: 4px;
}

.zone-head .label {
  font-size: 9px;
  color: var(--brick);
}

.zone-head code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--oxblood);
}

.desk-diorama {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  background: var(--page);
  box-shadow: inset 0 0 0 2px var(--vellum);
}

.init-rack {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  padding: 6px;
  background: var(--card);
  border-bottom: 4px solid var(--oxblood);
  box-shadow: 0 0 0 2px var(--ink);
}

.tome-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 3px 2px;
  transition: transform 0.1s steps(1, end);
}

.tome-slot.lit {
  transform: translateY(-3px);
  background: var(--page);
  box-shadow: 0 0 0 1px var(--gold);
}

.tome-slot span {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  color: var(--ink);
}

.cast-floor {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 6px 4px 2px;
}

.scribe-mover,
.lectern-mid,
.mage-caster {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transition: transform 0.15s steps(1, end);
}

.char-w {
  width: 64px;
}

.act-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  padding: 1px 5px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--border);
  color: var(--oxblood);
}

.lectern-mid code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--crimson);
}

.magic-stream {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 24px;
}

.stream-spark {
  width: 8px;
  height: 8px;
  background: var(--vellum);
  box-shadow: 0 0 0 1px var(--ink);
}

.stream-spark.on {
  background: var(--vermilion);
}

.zone-foot {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  line-height: 1.3;
  color: var(--ink);
  padding: 5px 8px;
  background: var(--page);
  box-shadow: 0 0 0 1px var(--sage);
}

/* Estantería de 3 Repisas */
.wooden-bookcase {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 10px;
  background: var(--page);
  border-left: 6px solid var(--oxblood);
  border-right: 6px solid var(--oxblood);
  box-shadow: inset 0 0 0 2px var(--gold), 0 0 0 2px var(--ink);
}

.shelf-tier {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.tier-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tier-label code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--oxblood);
}

.tier-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--muted);
}

.tier-sub.bad {
  color: var(--crimson);
  font-weight: 700;
}

.books-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 6px;
  padding: 0 4px;
}

.book-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.book-item code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  color: var(--ink);
}

.b-loc {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  color: var(--muted);
}

.bloated-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 6px;
  background: color-mix(in srgb, var(--crimson) 12%, var(--card));
  box-shadow: 0 0 0 2px var(--crimson);
  transition: transform 0.1s steps(1, end);
}

.bloated-item.shake {
  transform: translate(2px, -2px);
}

.bloat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bloat-info code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  font-weight: 700;
  color: var(--crimson);
}

.bloat-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  padding: 1px 4px;
  background: var(--crimson);
  color: var(--card);
}

.wooden-plank {
  height: 6px;
  background: var(--oxblood);
  box-shadow: 0 0 0 2px var(--ink);
}

.wooden-plank.cracked {
  background: repeating-linear-gradient(90deg, var(--oxblood) 0 44px, var(--crimson) 44px 52px);
}

.wooden-plank.dashed {
  background: repeating-linear-gradient(90deg, var(--muted) 0 12px, transparent 12px 20px);
  box-shadow: none;
}

.void-space {
  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background: color-mix(in srgb, var(--ink) 5%, var(--page));
  border: 1px dashed var(--muted);
}

.cobweb-msg {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--muted);
  max-width: 240px;
  line-height: 1.25;
}

.leak-column {
  position: relative;
  width: 24px;
  height: 48px;
}

.leak-drop {
  position: absolute;
  left: 8px;
  width: 8px;
  height: 8px;
  background: var(--crimson);
  box-shadow: 0 0 0 1px var(--ink);
}

.leak-drop.d2 {
  left: 14px;
  background: var(--vermilion);
}

.barrel-box {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 6px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--vermilion);
}

.barrel-box code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  font-weight: 700;
  color: var(--oxblood);
}

.lonely-test-row {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sliding-test {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 10px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--gold);
  transition: transform 0.2s steps(1, end);
}

.st-copy {
  display: flex;
  flex-direction: column;
}

.st-copy code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  color: var(--ink);
}

.st-copy span {
  font-size: 9px;
  color: var(--muted);
}
</style>

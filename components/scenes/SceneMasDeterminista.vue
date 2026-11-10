<!--
  SceneMasDeterminista.vue — Slide T-05 (Nivel 4: demo-mas-determinista).
  El escriba agrega el tomo maestro de granularidad ESLint (max-lines: 250, max-lines-per-function: 35)
  e instala tabiques divisorios en la gran biblioteca. El mago y el escriba en sincronía
  llenan los 6 compartimentos modulares (controller + service + test), cerrando con el pase a la demo en vivo.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { BOOK_TOMO_GRID, LECTERN_GRID } from '../../utils/workshopSprites'
import PixelArt from '../PixelArt.vue'
import PixelCharacter from '../PixelCharacter.vue'
import PixelIcon from '../PixelIcon.vue'

const COMPARTMENTS = [
  { domain: 'usuario', loc: '49L' },
  { domain: 'mesa', loc: '46L' },
  { domain: 'categoria', loc: '38L' },
  { domain: 'plato', loc: '51L' },
  { domain: 'comanda', loc: '57L' },
  { domain: 'health', loc: '14L' },
]

const frame = useFrameLoop(12, 360)
const activeCol = computed(() => frame.value % COMPARTMENTS.length)
const beamOn = computed(() => frame.value % 2 === 0)
</script>

<template>
  <div class="mas-stage">
    <!-- Zona Izquierda: Reglas de Límite de Líneas y Complejidad -->
    <section class="master-study">
      <div class="zone-head">
        <span class="label">1 · Reglas de Granularidad y Tamaño</span>
        <code>eslint.config.js</code>
      </div>

      <div class="study-diorama">
        <!-- Configuración de límites en ESLint -->
        <div class="master-lectern">
          <PixelArt :grid="LECTERN_GRID" :scale="3" />
          <div class="ml-rules">
            <div class="ml-pill">
              <span class="label">Por Archivo / Clase</span>
              <code>max-lines: 250</code>
            </div>
            <div class="ml-pill">
              <span class="label">Por Función / Método</span>
              <code>max-lines-per-function: 35</code>
            </div>
          </div>
        </div>

        <!-- Acciones técnicas en sincronía -->
        <div class="master-duo">
          <div class="duo-member">
            <PixelCharacter who="scribe" facing="right" class="duo-char" />
            <span class="duo-role">Agrega límites</span>
          </div>

          <div class="harmonic-bridge">
            <span class="label">Control Determinista</span>
            <div class="bridge-orbs">
              <span v-for="n in 5" :key="n" class="h-orb" :class="{ lit: (frame + n) % 2 === 0 }" />
            </div>
            <span class="bridge-sub">+ ArchUnit 1:1 + Coverage ≥ 90%</span>
          </div>

          <div class="duo-member">
            <PixelCharacter who="mage" facing="left" class="duo-char" />
            <span class="duo-role">Crea módulos</span>
          </div>
        </div>
      </div>

      <!-- Banner hacia la Demo en Vivo -->
      <div class="live-demo-box">
        <PixelIcon name="code" class="ld-ico" />
        <div class="ld-copy">
          <span class="label">Siguiente Paso · En Vivo en Computadora</span>
          <span>Mostrar las 4 carpetas y correr <code>npm run test:coverage</code></span>
        </div>
      </div>
    </section>

    <!-- Zona Derecha: Arquitectura Modular de 6 Dominios Desacoplados -->
    <section class="library-zone">
      <div class="zone-head">
        <span class="label">2 · Arquitectura Modular por Dominio (Límite 250 / 35 Líneas)</span>
        <span class="suite-badge">16 archivos <code>.test.ts</code> PASS</span>
      </div>

      <div class="grand-library">
        <!-- Encabezado de Columnas con Tabiques de Límite -->
        <div class="cubby-grid">
          <div
            v-for="(c, i) in COMPARTMENTS"
            :key="c.domain"
            class="cubby-col"
            :class="{ lit: activeCol === i }"
          >
            <div class="cubby-head">
              <span class="c-dom">{{ c.domain }}</span>
              <span class="c-loc">{{ c.loc }}</span>
            </div>

            <!-- Estante 1: Controller -->
            <div class="cubby-shelf">
              <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--oxblood)' }" />
              <code>controller</code>
            </div>
            <div class="mini-plank" />

            <!-- Estante 2: Service -->
            <div class="cubby-shelf">
              <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--gold)' }" />
              <code>service</code>
            </div>
            <div class="mini-plank" />

            <!-- Estante 3: Tests Unitarios 1:1 -->
            <div class="cubby-shelf tests-shelf">
              <div class="twin-books">
                <PixelArt :grid="BOOK_TOMO_GRID" :scale="1.5" :colors="{ A: 'var(--sage)' }" />
                <PixelArt :grid="BOOK_TOMO_GRID" :scale="1.5" :colors="{ A: 'var(--sage)' }" />
              </div>
              <span class="t-ok"><PixelIcon name="check" class="chk" /> 2 tests</span>
            </div>
            <div class="mini-plank base" />
          </div>
        </div>

        <div class="library-footer">
          <span class="lf-item"><PixelIcon name="check" class="chk" /> 6 Controladores (≤ 57 LOC)</span>
          <span class="lf-item"><PixelIcon name="check" class="chk" /> 6 Servicios independientes</span>
          <span class="lf-item"><PixelIcon name="check" class="chk" /> 0 errores ESLint / ArchUnit</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.mas-stage {
  width: 100%;
  display: grid;
  grid-template-columns: 0.88fr 1.42fr;
  align-items: stretch;
  gap: 14px;
}

.master-study,
.library-zone {
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

.suite-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  background: var(--sage);
  color: var(--ink);
  box-shadow: 0 0 0 1px var(--ink);
}

.study-diorama {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  background: var(--page);
  box-shadow: inset 0 0 0 2px var(--sage);
}

.master-lectern {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
  padding: 6px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--gold);
}

.ml-rules {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ml-pill {
  display: flex;
  flex-direction: column;
  padding: 3px 8px;
  background: var(--page);
  box-shadow: 0 0 0 1px var(--oxblood);
}

.ml-pill .label {
  font-size: 8px;
  color: var(--brick);
}

.ml-pill code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--ink);
}

.master-duo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 4px 6px;
}

.duo-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.duo-char {
  width: 56px;
}

.duo-role {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  color: var(--oxblood);
  font-weight: 700;
}

.harmonic-bridge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.harmonic-bridge .label {
  font-size: 8.5px;
  color: var(--oxblood);
}

.bridge-orbs {
  display: flex;
  gap: 5px;
}

.h-orb {
  width: 8px;
  height: 8px;
  background: var(--gold);
  box-shadow: 0 0 0 1px var(--ink);
}

.h-orb.lit {
  background: var(--sage);
  transform: translateY(-2px);
}

.bridge-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  color: var(--muted);
}

.live-demo-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--oxblood), inset 0 0 0 2px var(--gold);
}

.ld-ico {
  width: 20px;
  height: 20px;
  color: var(--crimson);
  flex: none;
}

.ld-copy {
  display: flex;
  flex-direction: column;
  font-size: 10.5px;
  line-height: 1.25;
}

.ld-copy .label {
  font-size: 8.5px;
  color: var(--crimson);
}

/* Gran Biblioteca de 6 Columnas con Tabiques */
.grand-library {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  background: var(--page);
  border: 4px solid var(--oxblood);
  box-shadow: inset 0 0 0 2px var(--gold), 0 0 0 2px var(--ink);
}

.cubby-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
  border-left: 3px solid var(--oxblood);
}

.cubby-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 3px 0;
  border-right: 3px solid var(--oxblood);
  background: var(--page);
  transition: background 0.1s steps(1, end), transform 0.1s steps(1, end);
}

.cubby-col.lit {
  background: var(--card);
  box-shadow: inset 0 0 0 2px var(--sage);
}

.cubby-head {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3px;
  border-bottom: 2px dashed var(--gold);
  margin-bottom: 4px;
}

.c-dom {
  font-family: 'VT323', monospace;
  font-size: 17px;
  line-height: 1;
  text-transform: uppercase;
  color: var(--oxblood);
}

.c-loc {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  padding: 0 4px;
  background: var(--sage);
  color: var(--ink);
  font-weight: 700;
}

.cubby-shelf {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 3px 0;
}

.cubby-shelf code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  color: var(--ink);
}

.mini-plank {
  width: 100%;
  height: 4px;
  background: var(--oxblood);
  box-shadow: 0 1px 0 var(--ink);
}

.mini-plank.base {
  height: 6px;
  background: var(--iron);
}

.twin-books {
  display: flex;
  gap: 2px;
}

.t-ok {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  color: var(--ink);
  font-weight: 700;
}

.chk {
  width: 10px;
  height: 10px;
  color: var(--sage);
}

.library-footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 6px 2px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  font-weight: 700;
  color: var(--ink);
}

.lf-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>

<!--
  SceneDeterminista.vue — Slide T-04 (Nivel 3: demo-determinista).
  El escriba levanta su escritorio formal con 3 atriles de reglas deterministas (ArchUnit 1:1,
  Coverage >= 90%, ESLint no-any). El mago ya es experto en las reglas, pero como a la estantería
  le faltan tabiques de tamaño máximo (max-lines), fusiona las 5 entidades en un único
  Megatomo colosal (restaurant.controller.ts + restaurant.service.ts) para hacer solo 1 test.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { BOOK_TOMO_GRID, LECTERN_GRID, MEGA_TOME_GRID } from '../../utils/workshopSprites'
import PixelArt from '../PixelArt.vue'
import PixelCharacter from '../PixelCharacter.vue'
import PixelIcon from '../PixelIcon.vue'

const LAW_LECTERNS = [
  { title: 'ArchUnit', rule: '1 archivo .ts = 1 .test.ts' },
  { title: 'Coverage', rule: 'Lines ≥ 90% · Branch ≥ 80%' },
  { title: 'ESLint', rule: 'no-explicit-any: error' },
]

const ENTITIES = ['usuarios', 'mesas', 'categorias', 'platos', 'comandas']

const frame = useFrameLoop(12, 380)

// El escriba recorre los 3 atriles de leyes (0, 1, 2)
const activeLaw = computed(() => Math.floor(frame.value / 2) % 3)
const scribeX = computed(() => (activeLaw.value - 1) * 16)

// Fase de fusión de las 5 entidades hacia el Megatomo
const mergePhase = computed(() => frame.value % 6)
const heavyBounce = computed(() => (frame.value % 2 === 0 ? 0 : 2))
</script>

<template>
  <div class="det-stage">
    <!-- Zona Izquierda: Reglas Deterministas Configuradas -->
    <section class="scribe-sanctum">
      <div class="zone-head">
        <span class="label">1 · Reglas Deterministas Configuradas</span>
        <code>architecture.test.ts + lint.test.ts</code>
      </div>

      <div class="lecterns-bench">
        <!-- Las 3 Reglas Activas -->
        <div class="lecterns-row">
          <div
            v-for="(l, i) in LAW_LECTERNS"
            :key="l.title"
            class="lectern-card"
            :class="{ active: activeLaw === i }"
          >
            <PixelArt :grid="LECTERN_GRID" :scale="2" />
            <span class="lc-title">{{ l.title }}</span>
            <code class="lc-rule">{{ l.rule }}</code>
          </div>
        </div>

        <!-- Acciones técnicas de los personajes -->
        <div class="sanctum-floor">
          <div class="scribe-patrol" :style="{ transform: `translateX(${scribeX}px)` }">
            <PixelCharacter who="scribe" facing="right" class="char-sp" />
            <span class="patrol-lbl">Agrega reglas 1:1</span>
          </div>

          <div class="mage-expert">
            <PixelCharacter who="mage" facing="right" class="char-sp" />
            <span class="patrol-lbl">Cumple las métricas</span>
          </div>
        </div>
      </div>

      <div class="law-callout">
        <span class="label">El vacío que se puede olvidar preparar:</span>
        <span>Se exigió <code>1 archivo = 1 test</code> con <code>90% coverage</code>, pero <strong>sin límite de líneas máximas</strong> por archivo ni por función.</span>
      </div>
    </section>

    <!-- Zona Derecha: El Atajo de la IA (Specification Gaming) -->
    <section class="megatome-zone">
      <div class="zone-head">
        <span class="label">2 · El Atajo de la IA (Specification Gaming)</span>
        <code>1 solo controlador para todo el restaurante</code>
      </div>

      <div class="forge-bookcase">
        <!-- Paso Superior: Las 5 Entidades se agrupan en un solo archivo para ahorrar tests -->
        <div class="fusion-chamber">
          <div class="ent-pills">
            <span
              v-for="(e, i) in ENTITIES"
              :key="e"
              class="e-orb"
              :class="{ fusing: mergePhase === i || mergePhase === 5 }"
            >
              {{ e }}
            </span>
          </div>
          <div class="fusion-caption">
            <span>Si separa 5 archivos, la regla exige 5 suites de tests → la IA concentra todo en 1 solo controlador y 1 solo servicio</span>
          </div>
        </div>

        <!-- CAPA DEL CONTROLADOR Y SERVICIO CONCENTRADO -->
        <div class="mega-shelf">
          <div class="shelf-no-dividers">
            <span class="no-div-tag">Sin regla max-lines ni max-lines-per-function</span>
          </div>

          <div class="mega-books-row" :style="{ transform: `translateY(${heavyBounce}px)` }">
            <!-- Archivo concentrado 1: restaurant.controller.ts -->
            <div class="mega-tome-box">
              <PixelArt :grid="MEGA_TOME_GRID" :scale="3" />
              <div class="mt-meta">
                <code>restaurant.controller.ts</code>
                <span class="mt-loc">166 LOC · Las 5 entidades juntas</span>
              </div>
            </div>

            <!-- Archivo concentrado 2: restaurant.service.ts -->
            <div class="mega-tome-box">
              <PixelArt :grid="MEGA_TOME_GRID" :scale="3" />
              <div class="mt-meta">
                <code>restaurant.service.ts</code>
                <span class="mt-loc">226 LOC · 1 sola clase gigante</span>
              </div>
            </div>
          </div>

          <!-- Repisa cargada por los dos archivos monolíticos -->
          <div class="heavy-plank" />
        </div>

        <!-- CAPA DE TESTS: Cumple la regla 1:1 con solo 1 archivo de test por capa -->
        <div class="compliant-shelf">
          <div class="comp-pair">
            <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--sage)' }" />
            <div>
              <code>restaurant.controller.test.ts</code>
              <span class="pass-pill"><PixelIcon name="check" class="chk" /> Regla 1:1 PASS</span>
            </div>
          </div>

          <div class="comp-pair">
            <PixelArt :grid="BOOK_TOMO_GRID" :scale="2" :colors="{ A: 'var(--sage)' }" />
            <div>
              <code>restaurant.service.test.ts</code>
              <span class="pass-pill"><PixelIcon name="check" class="chk" /> Coverage ≥ 90% PASS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.det-stage {
  width: 100%;
  display: grid;
  grid-template-columns: 0.92fr 1.38fr;
  align-items: stretch;
  gap: 14px;
}

.scribe-sanctum,
.megatome-zone {
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
  font-size: 10px;
  font-weight: 700;
  color: var(--oxblood);
}

.lecterns-bench {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  background: var(--page);
  box-shadow: inset 0 0 0 2px var(--vellum);
}

.lecterns-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.lectern-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 5px 4px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--vellum);
  text-align: center;
  transition: transform 0.1s steps(1, end), box-shadow 0.1s steps(1, end);
}

.lectern-card.active {
  transform: translateY(-3px);
  box-shadow: 0 0 0 2px var(--ink), 0 0 0 4px var(--gold);
}

.lc-title {
  font-family: 'VT323', monospace;
  font-size: 18px;
  line-height: 1;
  color: var(--oxblood);
}

.lc-rule {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  color: var(--ink);
  line-height: 1.2;
}

.sanctum-floor {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding-top: 4px;
}

.scribe-patrol,
.mage-expert {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transition: transform 0.2s steps(1, end);
}

.char-sp {
  width: 64px;
}

.patrol-lbl {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  padding: 1px 6px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--gold);
  color: var(--ink);
  font-weight: 700;
}

.law-callout {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  background: color-mix(in srgb, var(--gold) 20%, var(--page));
  box-shadow: 0 0 0 2px var(--oxblood);
  font-size: 10.5px;
  line-height: 1.25;
}

.law-callout .label {
  font-size: 8.5px;
  color: var(--crimson);
}

/* Estantería del Megatomo */
.forge-bookcase {
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

.fusion-chamber {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--border);
}

.ent-pills {
  display: flex;
  gap: 6px;
}

.e-orb {
  padding: 1px 7px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
  transition: transform 0.1s steps(1, end), background 0.1s steps(1, end);
}

.e-orb.fusing {
  background: var(--gold);
  transform: translateY(3px);
  font-weight: 700;
}

.fusion-caption {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  color: var(--oxblood);
  text-align: center;
}

.mega-shelf {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.shelf-no-dividers {
  text-align: center;
}

.no-div-tag {
  font-family: 'Silkscreen', monospace;
  font-size: 8.5px;
  text-transform: uppercase;
  padding: 1px 8px;
  background: var(--vermilion);
  color: var(--card);
}

.mega-books-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 4px 6px 0;
  transition: transform 0.15s steps(1, end);
}

.mega-tome-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--gold), inset 0 0 0 2px var(--oxblood);
}

.mt-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.mt-meta code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--oxblood);
}

.mt-loc {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--crimson);
  font-weight: 700;
}

.heavy-plank {
  height: 8px;
  background: linear-gradient(90deg, var(--oxblood), var(--crimson), var(--oxblood));
  box-shadow: 0 0 0 2px var(--ink);
}

.compliant-shelf {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding-top: 4px;
  border-bottom: 6px solid var(--oxblood);
  padding-bottom: 4px;
}

.comp-pair {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--sage);
}

.comp-pair code {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  color: var(--ink);
}

.pass-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8.5px;
  font-weight: 700;
  color: var(--ink);
  background: var(--sage);
  padding: 0 4px;
}

.chk {
  width: 10px;
  height: 10px;
}
</style>

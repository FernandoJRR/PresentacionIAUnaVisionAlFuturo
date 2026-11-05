<!--
  global-bottom.vue — Flechas de navegación pixel-art globales con enrutamiento consciente de caminos.
  - Se muestran en todas las diapositivas; en la diapositiva de bifurcación ('bifurcacion'),
    SOLO se muestra la flecha hacia atrás (ocultando la flecha hacia adelante porque el usuario
    debe elegir explícitamente uno de los dos caminos).
  - Aíslan por completo el Camino 1 y el Camino 2 para que nunca se crucen entre sí:
    * Primera de Camino 1 / Primera de Camino 2 (flecha anterior) -> Cruce de Caminos ('bifurcacion')
    * Última de Camino 1 / Última de Camino 2 (flecha siguiente)  -> Convergencia final ('cierre')
    * Cierre (flecha anterior)                                    -> Última del camino activo visitado
-->
<script setup>
import { computed, watch } from 'vue'
import { useNav } from '@slidev/client'
import { useBranchingNav } from './setup/branching'

const { currentSlideNo, clicks, clicksStart, clicksTotal, isPrintMode } = useNav()
const {
  isForkSlide,
  getPrevTargetSlide,
  getNextTargetSlide,
  smartPrev,
  smartNext,
  syncActivePath,
} = useBranchingNav()

watch(currentSlideNo, (no) => {
  syncActivePath(no)
}, { immediate: true })

const showNavArrows = computed(() => !isPrintMode.value)
const showNextArrow = computed(() => !isForkSlide(currentSlideNo.value))

const canGoPrev = computed(() => {
  if (clicks.value > clicksStart.value)
    return true
  return getPrevTargetSlide(currentSlideNo.value) != null
})

const canGoNext = computed(() => {
  if (isForkSlide(currentSlideNo.value))
    return false
  if (clicks.value < clicksTotal.value)
    return true
  return getNextTargetSlide(currentSlideNo.value) != null
})

// Matrices 8x8 para flechas pixel-art crispEdges
const LEFT_ARROW = [
  '....KK..',
  '...KK...',
  '..KK....',
  '.KKKKKKK',
  '.KKKKKKK',
  '..KK....',
  '...KK...',
  '....KK..',
]

const RIGHT_ARROW = [
  '..KK....',
  '...KK...',
  '....KK..',
  'KKKKKKK.',
  'KKKKKKK.',
  '....KK..',
  '...KK...',
  '..KK....',
]

function toRects(grid) {
  const out = []
  grid.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      let e = x
      while (e + 1 < row.length && row[e + 1] === ch) e++
      if (ch !== '.') out.push({ x, y, w: e - x + 1 })
      x = e + 1
    }
  })
  return out
}

const leftPixels = toRects(LEFT_ARROW)
const rightPixels = toRects(RIGHT_ARROW)
</script>

<template>
  <div v-if="showNavArrows" class="branch-arrows" @pointerdown.stop>
    <button
      type="button"
      class="arrow-btn"
      :disabled="!canGoPrev"
      aria-label="Diapositiva anterior"
      title="Anterior"
      @click.stop="smartPrev(false)"
    >
      <svg viewBox="0 0 8 8" class="arrow-svg" shape-rendering="crispEdges" aria-hidden="true">
        <rect v-for="(p, i) in leftPixels" :key="`l${i}`" :x="p.x" :y="p.y" :width="p.w" height="1" />
      </svg>
    </button>

    <button
      v-if="showNextArrow"
      type="button"
      class="arrow-btn"
      :disabled="!canGoNext"
      aria-label="Siguiente diapositiva"
      title="Siguiente"
      @click.stop="smartNext(false)"
    >
      <svg viewBox="0 0 8 8" class="arrow-svg" shape-rendering="crispEdges" aria-hidden="true">
        <rect v-for="(p, i) in rightPixels" :key="`r${i}`" :x="p.x" :y="p.y" :width="p.w" height="1" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.branch-arrows {
  position: fixed;
  right: 34px;
  bottom: 30px;
  z-index: 40;
  display: flex;
  gap: 0.5rem;
  pointer-events: auto;
}

.arrow-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: var(--card);
  color: var(--ink);
  border: 2px solid var(--oxblood);
  box-shadow:
    inset 0 0 0 2px var(--page),
    3px 3px 0 var(--vellum);
  cursor: pointer;
  transition: transform 0.08s steps(1, end), border-color 0.08s steps(1, end), color 0.08s steps(1, end);
}

.arrow-btn:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  border-color: var(--crimson);
  color: var(--crimson);
  box-shadow:
    inset 0 0 0 2px var(--card),
    4px 4px 0 var(--oxblood);
}

.arrow-btn:active:not(:disabled) {
  transform: translate(1px, 1px);
  box-shadow:
    inset 0 0 0 2px var(--page),
    1px 1px 0 var(--vellum);
}

.arrow-btn:disabled {
  opacity: 0.35;
  cursor: default;
  border-color: var(--border);
  box-shadow: none;
}

.arrow-svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
  display: block;
}
</style>

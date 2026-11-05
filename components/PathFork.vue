<!--
  PathFork.vue — Selector interactivo de bifurcación ("El Cruce de Caminos").
  Es la única diapositiva donde se permite alegoría escrita de los dos senderos/personajes;
  actualiza `activePath` antes de navegar para mantener aislado cada camino.
  NOTA: No mostrar nunca el año o nivel académico en la interfaz visible.
-->
<script setup>
import { useNav } from '@slidev/client'
import { activePath } from '../setup/branching'
import PixelCharacter from './PixelCharacter.vue'

const { go } = useNav()

const PATHS = [
  {
    id: 'camino-manana',
    key: 'manana',
    badge: 'Camino I',
    session: 'Sesión Matutina',
    title: 'El Aprendiz Consciente',
    desc: 'Controlar a la IA y no que ella nos controle: modelos mentales, diálogo socrático y fundamentos.',
    who: 'scribe',
    facing: 'right',
    cta: 'Entrar al Camino I →',
  },
  {
    id: 'camino-tarde',
    key: 'tarde',
    badge: 'Camino II',
    session: 'Sesión Vespertina',
    title: 'El Arquitecto de Forjas',
    desc: 'Ingeniería Agéntica en proyectos reales: Agent Harness, Guardrails deterministas y fin del AI Slop.',
    who: 'mage',
    facing: 'left',
    cta: 'Entrar al Camino II →',
  },
]

function selectPath(p) {
  activePath.value = p.key
  go(p.id)
}
</script>

<template>
  <div class="fork-container">
    <div class="fork-header">
      <span class="label">El Cruce de Caminos · Universidad Mesoamericana</span>
      <h1>Elige el Sendero de la Sesión</h1>
      <div class="fork-divider" />
    </div>

    <div class="fork-grid">
      <button
        v-for="p in PATHS"
        :key="p.id"
        type="button"
        class="fork-card"
        @click="selectPath(p)"
      >
        <div class="fork-card-top">
          <span class="label fork-badge">{{ p.badge }}</span>
          <span class="fork-sub">{{ p.session }}</span>
        </div>

        <div class="fork-stage">
          <PixelCharacter :who="p.who" :facing="p.facing" style="width: 80px" />
          <div class="fork-copy">
            <h2>{{ p.title }}</h2>
            <p>{{ p.desc }}</p>
          </div>
        </div>

        <div class="fork-footer">
          <span class="label fork-cta">{{ p.cta }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.fork-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0.5rem 1.5rem;
}

.fork-header {
  text-align: center;
  margin-bottom: 1.25rem;
}

.fork-header .label {
  color: var(--brick);
  display: block;
}

.fork-header h1 {
  font-size: 3.25rem;
  line-height: 1;
  margin: 0.35rem 0 0;
  text-shadow: 3px 3px 0 var(--vellum);
}

.fork-divider {
  width: 180px;
  height: 4px;
  margin: 0.65rem auto 0;
  background: repeating-linear-gradient(90deg, var(--gold) 0 8px, transparent 8px 12px);
}

.fork-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  width: 100%;
  max-width: 820px;
}

.fork-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  background: var(--card);
  border: 3px solid var(--oxblood);
  box-shadow:
    inset 0 0 0 3px var(--page),
    inset 0 0 0 5px var(--gold),
    6px 6px 0 var(--vellum);
  padding: 1.15rem 1.25rem;
  cursor: pointer;
  transition: transform 0.08s steps(1, end), box-shadow 0.08s steps(1, end), border-color 0.08s steps(1, end);
}

.fork-card:hover,
.fork-card:focus-visible {
  transform: translate(-2px, -2px);
  border-color: var(--crimson);
  box-shadow:
    inset 0 0 0 3px var(--card),
    inset 0 0 0 5px var(--crimson),
    8px 8px 0 var(--oxblood);
  outline: none;
}

.fork-card:active {
  transform: translate(2px, 2px);
  box-shadow:
    inset 0 0 0 3px var(--page),
    inset 0 0 0 5px var(--gold),
    2px 2px 0 var(--vellum);
}

.fork-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px dashed var(--vellum);
  padding-bottom: 0.45rem;
  margin-bottom: 0.75rem;
}

.fork-badge {
  color: var(--crimson);
  font-size: 10px;
}

.fork-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: var(--muted);
}

.fork-stage {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.25rem 0 0.85rem;
}

.fork-copy h2 {
  font-size: 1.9rem;
  line-height: 1.05;
  margin: 0 0 0.35rem;
  color: var(--oxblood);
}

.fork-copy p {
  font-size: 0.88rem;
  line-height: 1.35;
  color: var(--ink);
  margin: 0;
}

.fork-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.45rem;
  border-top: 1px solid var(--vellum);
}

.fork-cta {
  color: var(--vermilion);
  font-size: 11px;
}

.fork-card:hover .fork-cta {
  color: var(--crimson);
}
</style>

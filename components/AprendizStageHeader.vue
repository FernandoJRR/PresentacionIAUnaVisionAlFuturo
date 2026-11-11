<!--
  AprendizStageHeader.vue — Marco estándar para las diapositivas de Camino I (Sesión Matutina).
  Encabezado de afirmación, emblema ControlOrb y franja del ciclo Pensar → Preguntar → Verificar → Explicar.
-->
<script setup>
import ControlOrb from './ControlOrb.vue'

const props = defineProps({
  step: { type: Number, required: true }, // 0: Descarga cognitiva, 1: Pensar, 2: Preguntar, 3: Verificar, 4: Explicar
  tag: { type: String, required: true },
  title: { type: String, required: true },
})

const STEPS = [
  { id: 0, name: 'Descarga Cognitiva', color: 'var(--crimson)' },
  { id: 1, name: '1 · Pensar', color: 'var(--vermilion)' },
  { id: 2, name: '2 · Preguntar', color: 'var(--brick)' },
  { id: 3, name: '3 · Verificar', color: 'var(--gold)' },
  { id: 4, name: '4 · Explicar', color: 'var(--sage)' },
]
</script>

<template>
  <div class="a-stage">
    <header class="a-head">
      <div class="a-titles">
        <span class="label">Camino I · Sesión Matutina · {{ props.tag }}</span>
        <h1>{{ props.title }}</h1>
      </div>
      <ControlOrb :level="props.step" class="a-orb" />
    </header>

    <div class="a-body">
      <slot />
    </div>

    <ol class="a-strip" aria-hidden="true">
      <li
        v-for="s in STEPS"
        :key="s.id"
        :class="{ past: s.id < props.step, cur: s.id === props.step }"
        :style="{ '--step-color': s.color }"
      >
        <span class="step-dot" />
        <span class="step-lbl">{{ s.name }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.a-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.a-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.35rem;
}

.a-titles {
  flex: 1;
  min-width: 0;
}

.a-titles .label {
  color: var(--brick);
  display: block;
}

.a-titles h1 {
  font-size: 2.15rem;
  line-height: 1.02;
  margin: 0.2rem 0 0;
  text-shadow: 3px 3px 0 var(--vellum);
}

.a-orb {
  flex: none;
  margin-top: -6px;
}

.a-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2.2rem;
  min-height: 0;
}

.a-strip {
  position: absolute;
  left: 44px;
  bottom: 34px;
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.a-strip li {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  opacity: 0.55;
}

.a-strip li.past {
  opacity: 0.8;
}

.a-strip li.cur {
  opacity: 1;
}

.step-dot {
  width: 8px;
  height: 8px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--vellum);
}

.a-strip li.past .step-dot {
  background: var(--muted);
  box-shadow: 0 0 0 2px var(--ink);
}

.a-strip li.cur .step-dot {
  width: 11px;
  height: 11px;
  background: var(--step-color);
  box-shadow: 0 0 0 2px var(--ink), 2px 2px 0 var(--vellum);
}

.step-lbl {
  font-family: 'Silkscreen', monospace;
  font-size: 9px;
  text-transform: uppercase;
  color: var(--muted);
}

.a-strip li.cur .step-lbl {
  color: var(--ink);
}
</style>

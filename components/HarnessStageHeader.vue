<!--
  HarnessStageHeader.vue — Marco estándar para las diapositivas de Camino II (Sesión Vespertina).
  Encabezado de afirmación (Assertion-Evidence), insignia del directorio de demo y franja de progreso inferior.
-->
<script setup>
const props = defineProps({
  step: { type: Number, required: true }, // 0: Setup, 1: VibeCoding, 2: Probabilistico, 3: Determinista, 4: MasDeterminista
  tag: { type: String, required: true },
  title: { type: String, required: true },
  folder: { type: String, default: '' },
})

const STEPS = [
  { id: 0, name: 'Experimento', color: 'var(--oxblood)' },
  { id: 1, name: '1 · Vibe Coding', color: 'var(--crimson)' },
  { id: 2, name: '2 · Probabilístico', color: 'var(--vermilion)' },
  { id: 3, name: '3 · Determinista', color: 'var(--gold)' },
  { id: 4, name: '4 · Más Determinista', color: 'var(--sage)' },
]
</script>

<template>
  <div class="h-stage">
    <header class="h-head">
      <div class="h-titles">
        <span class="label">Camino II · Sesión Vespertina · {{ props.tag }}</span>
        <h1>{{ props.title }}</h1>
      </div>
      <div v-if="props.folder" class="h-folder">
        <span class="label folder-cap">Repositorio</span>
        <code>{{ props.folder }}</code>
      </div>
    </header>

    <div class="h-body">
      <slot />
    </div>

    <ol class="h-strip" aria-hidden="true">
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
.h-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.h-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.35rem;
}

.h-titles {
  flex: 1;
  min-width: 0;
}

.h-titles .label {
  color: var(--brick);
  display: block;
}

.h-titles h1 {
  font-size: 2.15rem;
  line-height: 1.02;
  margin: 0.2rem 0 0;
  text-shadow: 3px 3px 0 var(--vellum);
}

.h-folder {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 4px 10px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 var(--vellum);
}

.folder-cap {
  font-size: 9px;
  color: var(--muted);
  line-height: 1.1;
}

.h-folder code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--oxblood);
}

.h-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2.2rem;
  min-height: 0;
}

.h-strip {
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

.h-strip li {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  opacity: 0.55;
}

.h-strip li.past {
  opacity: 0.8;
}

.h-strip li.cur {
  opacity: 1;
}

.step-dot {
  width: 8px;
  height: 8px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--vellum);
}

.h-strip li.past .step-dot {
  background: var(--muted);
  box-shadow: 0 0 0 2px var(--ink);
}

.h-strip li.cur .step-dot {
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

.h-strip li.cur .step-lbl {
  color: var(--ink);
}
</style>

<!--
  TechScene.vue — Diapositiva de detalle de un hito de la línea de tiempo.
  Encabezado (año · campo + afirmación), escena animada en el slot y franja de progreso inferior.

    <TechScene id="lenet" field="Visión por computadora" title="...">
      <SceneLeNet />
    </TechScene>

  Usar con `class: ornate tech-slide` en el frontmatter.
-->
<script setup>
import { computed } from 'vue'
import { ERAS, TIMELINE_ALL, TIMELINE_BEFORE } from '../data/timelines'
import PhotoSlot from './PhotoSlot.vue'
import PixelCharacter from './PixelCharacter.vue'

const props = defineProps({
  id: { type: String, required: true },
  field: { type: String, required: true },
  title: { type: String, required: true },
})

const item = computed(() => TIMELINE_ALL.find(i => i.id === props.id))
const index = computed(() => TIMELINE_ALL.findIndex(i => i.id === props.id))
const before = computed(() => TIMELINE_BEFORE.some(i => i.id === props.id))
const cast = computed(() => (before.value ? 'scribe' : 'mage'))
const color = i => ERAS[i.era]?.color ?? 'var(--ink)'
</script>

<template>
  <div class="tech">
    <header class="tech-head">
      <div class="tech-titles">
        <span class="label">{{ item?.year }} · {{ field }}</span>
        <h1>{{ title }}</h1>
      </div>
      <PhotoSlot
        v-if="item?.photo"
        :src="typeof item.photo === 'object' ? item.photo.src : item.photoSrc"
        :caption="typeof item.photo === 'object' ? item.photo.caption : item.photo"
      />
      <PixelCharacter :who="cast" facing="left" class="tech-cast" />
    </header>

    <div class="tech-stage"><slot /></div>

    <ol class="tech-strip" aria-hidden="true">
      <li
        v-for="(it, i) in TIMELINE_ALL"
        :key="it.id"
        :class="{ past: i < index, cur: i === index, theory: it.kind === 'theory', jump: it.id === 'gnmt' }"
        :style="{ '--era': color(it) }"
      />
      <span class="strip-year">{{ item?.year }}</span>
    </ol>
  </div>
</template>

<style scoped>
.tech { flex: 1; display: flex; flex-direction: column; min-height: 0; }

.tech-head { display: flex; align-items: flex-start; gap: 1.25rem; }
.tech-titles { flex: 1; min-width: 0; }
.tech-titles .label { color: var(--brick); }
.tech-titles h1 {
  font-size: 2.2rem;
  line-height: 1;
  margin: 0.25rem 0 0;
  text-shadow: 3px 3px 0 var(--vellum);
}
.tech-cast { width: 64px; flex: none; }

.tech-stage { flex: 1; display: flex; align-items: center; padding-bottom: 2.25rem; min-height: 0; }

/* Progress strip: every milestone of the common trunk */
.tech-strip {
  position: absolute;
  left: 56px;
  bottom: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.tech-strip li {
  width: 8px;
  height: 8px;
  margin: 0;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--vellum);
}
.tech-strip li.jump { margin-left: 16px; }
.tech-strip li.theory { width: 6px; height: 6px; }
.tech-strip li.past { background: var(--muted); box-shadow: 0 0 0 2px var(--muted); }
.tech-strip li.cur { width: 12px; height: 12px; background: var(--era); box-shadow: 0 0 0 2px var(--ink); }
.strip-year { margin-left: 8px; font-family: 'VT323', monospace; font-size: 20px; color: var(--oxblood); }
</style>

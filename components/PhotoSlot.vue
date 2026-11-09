<!--
  PhotoSlot.vue — Marco para foto histórica difuminada (estilo retratos de créditos).
  Sin `src` muestra un placeholder con trama dithered y la descripción de la foto pendiente.

    <PhotoSlot caption="Alan Turing, c. 1951" />
    <PhotoSlot src="/history/turing-ink.png" caption="Alan Turing, c. 1951" />
-->
<script setup>
defineProps({
  src: { type: String, default: null },
  caption: { type: String, required: true },
})
</script>

<template>
  <figure class="photo-slot">
    <img v-if="src" :src="src" :alt="caption" />
    <div v-else class="pending"><span class="label">foto pendiente</span></div>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.photo-slot {
  margin: 0;
  padding: 4px 4px 2px;
  width: 136px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 2px var(--vellum);
}

img,
.pending { display: block; width: 128px; height: 96px; image-rendering: pixelated; }

.pending {
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-conic-gradient(var(--vellum) 0 25%, var(--card) 0 50%) 0 0 / 4px 4px;
  outline: 2px dashed var(--gold);
  outline-offset: -2px;
}
.pending .label {
  padding: 2px 4px;
  background: var(--card);
  font-size: 9px;
  color: var(--brick);
}

figcaption {
  margin-top: 2px;
  font-size: 10px;
  line-height: 1.2;
  text-align: center;
  color: var(--muted);
}
</style>

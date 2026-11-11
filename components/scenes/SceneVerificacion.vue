<!--
  SceneVerificacion.vue — Slide M-05.
  Una respuesta segura de sí misma con un error sutil (range(1, n) omite el primer elemento).
  La lupa recorre cada línea; la prueba con un caso conocido lo expone. Datos: Kabir et al. (CHI, 2024).
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import PixelArt from '../PixelArt.vue'

const LINES = [
  { code: 'def promedio(notas):', ok: true },
  { code: '    suma = 0', ok: true },
  { code: '    for i in range(1, len(notas)):', ok: false },
  { code: '        suma += notas[i]', ok: true },
  { code: '    return suma / len(notas)', ok: true },
]

const LENS = [
  '.KKKK...',
  'KBBBBK..',
  'KBBBBK..',
  'KBBBBK..',
  'KBBBBK..',
  '.KKKKK..',
  '.....KK.',
  '......KK',
]

const frame = useFrameLoop(LINES.length + 5, 600)
const scanned = computed(() => Math.min(LINES.length, frame.value + 1))
const scanning = computed(() => (frame.value < LINES.length ? frame.value : -1))
const tested = computed(() => frame.value > LINES.length)
</script>

<template>
  <div class="verify-scene">
    <div class="answer">
      <div class="a-head">
        <span class="label">Respuesta de la IA</span>
        <span class="claim">"Listo, este código calcula el promedio."</span>
      </div>

      <div class="code">
        <div
          v-for="(l, n) in LINES"
          :key="n"
          class="line"
          :class="{ scan: scanning === n, bad: n < scanned && !l.ok, good: n < scanned && l.ok }"
        >
          <span class="mark">{{ n < scanned ? (l.ok ? '✓' : '✗') : '' }}</span>
          <code>{{ l.code }}</code>
          <PixelArt v-if="scanning === n" :grid="LENS" :scale="3" class="lens" />
        </div>
      </div>

      <div class="test" :class="{ show: tested }">
        <code>promedio([80, 90])</code>
        <span>esperado <b>85.0</b> · obtenido <b class="bad-val">45.0</b></span>
      </div>
    </div>

    <div class="stats">
      <div class="stat">
        <span class="s-val">52%</span>
        <span class="s-lbl">de respuestas de programación contenían errores</span>
      </div>
      <div class="stat">
        <span class="s-val">39%</span>
        <span class="s-lbl">de las veces, los usuarios no detectaron el error</span>
      </div>
      <cite>Kabir et al., CHI 2024 · 517 preguntas de Stack Overflow</cite>
    </div>
  </div>
</template>

<style scoped>
.verify-scene {
  width: 100%;
  display: grid;
  grid-template-columns: 1.45fr 0.75fr;
  gap: 18px;
  align-items: stretch;
}

.answer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--vellum);
}

.a-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 2px dashed var(--vellum);
  padding-bottom: 5px;
}

.a-head .label {
  font-size: 10px;
  color: var(--brick);
}

.claim {
  font-size: 14px;
  color: var(--oxblood);
}

.code {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: var(--page);
  box-shadow: 0 0 0 1px var(--border);
}

.line {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
}

.line code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  white-space: pre;
  color: var(--ink);
}

.mark {
  width: 14px;
  font-size: 13px;
  font-weight: 700;
}

.line.good .mark {
  color: var(--sage);
}

.line.bad {
  background: var(--card);
  box-shadow: 0 0 0 2px var(--crimson);
}

.line.bad .mark,
.line.bad code {
  color: var(--crimson);
}

.line.scan {
  box-shadow: 0 0 0 2px var(--gold);
}

.lens {
  position: absolute;
  right: 8px;
  top: -2px;
}

.test {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 10px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--crimson);
  visibility: hidden;
}

.test.show {
  visibility: visible;
}

.test code {
  font-weight: 700;
}

.bad-val {
  color: var(--crimson);
}

.stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.stat {
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--ink), 4px 4px 0 2px var(--vellum);
}

.s-val {
  font-family: 'VT323', monospace;
  font-size: 44px;
  line-height: 1;
  color: var(--crimson);
}

.s-lbl {
  font-size: 13px;
  line-height: 1.2;
  color: var(--ink);
}

.stats cite {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-style: normal;
  color: var(--muted);
}
</style>

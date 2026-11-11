<!--
  SceneSocratico.vue — Slide M-03.
  Mismo problema en dos modos: la IA que entrega el código vs. la IA que devuelve preguntas.
  El escriba es el estudiante; el mago (orbe) es el modelo.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import PixelCharacter from '../PixelCharacter.vue'

const MODES = [
  {
    key: 'answer',
    name: 'Modo respuesta',
    start: 0,
    msgs: [
      { who: 'me', text: 'Dame el código para invertir una lista.' },
      { who: 'ai', code: 'return lista[::-1]' },
    ],
    result: 'Copiado · 0 preguntas · 0 razonamiento propio',
  },
  {
    key: 'tutor',
    name: 'Modo tutor',
    start: 2,
    msgs: [
      { who: 'me', text: 'No me des el código. Guíame con preguntas.' },
      { who: 'ai', text: '¿Qué posición ocupa el último elemento?' },
      { who: 'me', text: 'n − 1' },
      { who: 'ai', text: '¿Cómo recorrerías desde ahí hasta el inicio?' },
    ],
    result: '3 preguntas · el código lo escribes tú',
  },
]

const frame = useFrameLoop(10, 750)
const shown = m => Math.max(0, Math.min(m.msgs.length, frame.value - m.start + 1))
const done = m => shown(m) === m.msgs.length
</script>

<template>
  <div class="socratic-scene">
    <div v-for="m in MODES" :key="m.key" class="chat" :class="m.key">
      <div class="chat-head">
        <PixelCharacter who="scribe" facing="right" class="avatar" />
        <span class="label">{{ m.name }}</span>
        <PixelCharacter who="mage" facing="left" class="avatar" />
      </div>

      <div class="msgs">
        <template v-for="(msg, i) in m.msgs" :key="i">
          <div v-if="i < shown(m)" class="msg" :class="msg.who">
            <code v-if="msg.code">{{ msg.code }}</code>
            <span v-else>{{ msg.text }}</span>
          </div>
        </template>
      </div>

      <div class="result" :class="{ show: done(m) }">{{ m.result }}</div>
    </div>

    <p class="source">Asistentes que no entregan la solución completa: CodeAid, CHI 2024 · CS50 Duck, SIGCSE 2024</p>
  </div>
</template>

<style scoped>
.socratic-scene {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.chat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  background: var(--card);
  min-height: 250px;
}

.chat.answer {
  --tone: var(--crimson);
  box-shadow: 0 0 0 3px var(--crimson), 4px 4px 0 3px var(--vellum);
}

.chat.tutor {
  --tone: var(--sage);
  box-shadow: 0 0 0 3px var(--sage), 4px 4px 0 3px var(--vellum);
}

.chat-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 2px dashed var(--vellum);
  padding-bottom: 4px;
}

.chat-head .label {
  font-size: 11px;
  color: var(--ink);
  padding-bottom: 6px;
}

.avatar {
  width: 32px;
}

.msgs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.msg {
  max-width: 82%;
  padding: 5px 9px;
  font-size: 14px;
  line-height: 1.2;
}

.msg.me {
  align-self: flex-start;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}

.msg.ai {
  align-self: flex-end;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--gold), 2px 2px 0 2px var(--vellum);
}

.msg code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--oxblood);
}

.result {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  text-align: center;
  padding: 4px;
  color: var(--ink);
  background: var(--page);
  box-shadow: 0 0 0 2px var(--tone);
  visibility: hidden;
}

.result.show {
  visibility: visible;
}

.source {
  grid-column: 1 / -1;
  margin: 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--muted);
  text-align: center;
}
</style>

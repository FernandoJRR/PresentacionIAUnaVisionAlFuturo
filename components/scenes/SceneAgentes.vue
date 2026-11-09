<!--
  SceneAgentes.vue — Agentes de código sobre issues reales (Jimenez et al., 2024; Yao et al., 2023).
  Ciclo leer → editar → probar: la primera prueba falla, la segunda pasa y se abre el pull request.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import IoPanels from '../IoPanels.vue'
import PixelIcon from '../PixelIcon.vue'

const STATIONS = [
  { key: 'read', icon: 'doc', name: 'leer' },
  { key: 'edit', icon: 'code', name: 'editar' },
  { key: 'test', icon: 'check', name: 'probar' },
]
// Station visited per frame; test results at frames 2 (fail) and 4 (pass)
const PATH = ['read', 'edit', 'test', 'edit', 'test']

const frame = useFrameLoop(PATH.length + 4, 650)
const at = computed(() => PATH[Math.min(PATH.length - 1, frame.value)])
const result = computed(() => (frame.value >= 4 ? 'pass' : frame.value >= 2 ? 'fail' : null))
const pr = computed(() => frame.value >= PATH.length)
</script>

<template>
  <IoPanels :notes="['issue', 'ciclo editar → probar', 'pull request']">
    <template #input>
      <div class="issue">
        <span class="num">#42</span>
        <span>El login falla con correo vacío</span>
      </div>
    </template>

    <template #model>
      <div class="loop">
        <div v-for="s in STATIONS" :key="s.key" class="st" :class="{ on: at === s.key, [result]: s.key === 'test' && result && at === 'test' }">
          <PixelIcon :name="s.icon" class="ico" />
          <span>{{ s.name }}</span>
        </div>
        <span class="ret" :class="{ on: result === 'fail' && frame === 3 }">↺</span>
      </div>
    </template>

    <template #output>
      <div class="pr" :class="{ show: pr }">
        <span class="num">PR · fix #42</span>
        <code class="add">+ if (!email) return error</code>
        <code class="del">- login(email)</code>
        <span class="ok"><PixelIcon name="check" class="tick" /> pruebas pasan</span>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.issue {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  background: var(--page);
  box-shadow: 0 0 0 2px var(--ink);
}
.num { font-family: 'VT323', monospace; font-size: 22px; color: var(--crimson); line-height: 1; }

.loop { position: relative; display: flex; gap: 18px; padding-top: 12px; }
.st {
  width: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 4px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: var(--muted);
  box-shadow: 0 0 0 2px var(--vellum);
}
.st .ico { width: 32px; height: 32px; }
.st.on { color: var(--ink); background: var(--card); box-shadow: 0 0 0 2px var(--ink), 3px 3px 0 2px var(--gold); }
.st.fail { color: var(--card); background: var(--crimson); }
.st.pass { color: var(--ink); background: var(--sage); }
.ret { position: absolute; left: 50%; bottom: -34px; transform: translateX(-50%); font-family: 'VT323', monospace; font-size: 30px; color: var(--vellum); }
.ret.on { color: var(--crimson); }

.pr { display: flex; flex-direction: column; gap: 6px; visibility: hidden; width: 100%; }
.pr.show { visibility: visible; }
.pr code { display: block; padding: 2px 6px; font-size: 11px; white-space: nowrap; overflow: hidden; }
.add { background: color-mix(in srgb, var(--sage) 45%, var(--card)); }
.del { background: color-mix(in srgb, var(--crimson) 18%, var(--card)); }
.ok { display: flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; }
.tick { width: 16px; height: 16px; color: var(--sage); }
</style>

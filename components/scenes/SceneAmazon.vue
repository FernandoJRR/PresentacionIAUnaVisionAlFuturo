<!--
  SceneAmazon.vue — Filtrado colaborativo ítem a ítem (Linden, Smith & York, 2003).
  La fila del producto en el carrito se recorre buscando los productos más co-comprados. Valores ilustrativos.
-->
<script setup>
import { computed } from 'vue'
import { useFrameLoop } from '../../utils/frameLoop'
import { heat } from '../../utils/pixel'
import IoPanels from '../IoPanels.vue'
import PixelIcon from '../PixelIcon.vue'

const ITEMS = ['phones', 'disc', 'pad', 'camera', 'book']
const SIM = [
  [1, 0.9, 0.55, 0.2, 0.1],
  [0.9, 1, 0.3, 0.1, 0.2],
  [0.55, 0.3, 1, 0.1, 0.1],
  [0.2, 0.1, 0.1, 1, 0.3],
  [0.1, 0.2, 0.1, 0.3, 1],
]
const CART = 0
const PICKS = [1, 2]

const frame = useFrameLoop(ITEMS.length + 5, 500)
const col = computed(() => (frame.value < ITEMS.length ? frame.value : null))
const done = computed(() => frame.value >= ITEMS.length)
const fill = (y, x) => (y === CART && (done.value || x <= frame.value) && x !== CART ? heat(SIM[y][x]) : y === x ? 'var(--muted)' : 'var(--vellum)')
</script>

<template>
  <IoPanels :notes="['carrito', 'similitud ítem a ítem', 'recomendación']">
    <template #input>
      <div class="cart">
        <PixelIcon name="cart" class="big" />
        <div class="slot"><PixelIcon :name="ITEMS[CART]" class="ico" /></div>
      </div>
    </template>

    <template #model>
      <div class="mtx">
        <span />
        <PixelIcon v-for="(it, x) in ITEMS" :key="`h${it}`" :name="it" class="hdr" :class="{ cur: x === col }" />
        <template v-for="(it, y) in ITEMS" :key="it">
          <PixelIcon :name="it" class="hdr" :class="{ cur: y === CART }" />
          <span v-for="(_, x) in ITEMS" :key="x" class="cell" :class="{ row: y === CART }" :style="{ background: fill(y, x) }" />
        </template>
      </div>
    </template>

    <template #output>
      <div class="recs" :class="{ show: done }">
        <span class="label">También compraron</span>
        <div class="row">
          <div v-for="p in PICKS" :key="p" class="slot"><PixelIcon :name="ITEMS[p]" class="ico" /></div>
        </div>
      </div>
    </template>
  </IoPanels>
</template>

<style scoped>
.cart { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.big { width: 64px; height: 64px; color: var(--ink); }
.slot { padding: 8px; background: var(--page); box-shadow: 0 0 0 2px var(--ink); }
.ico { width: 40px; height: 40px; color: var(--ink); }

.mtx { display: grid; grid-template-columns: repeat(6, 32px); gap: 4px; align-items: center; justify-items: center; }
.hdr { width: 24px; height: 24px; color: var(--muted); }
.hdr.cur { color: var(--crimson); }
.cell { width: 28px; height: 28px; }
.cell.row { box-shadow: 0 0 0 2px var(--ink); }

.recs { display: flex; flex-direction: column; align-items: center; gap: 10px; visibility: hidden; }
.recs.show { visibility: visible; }
.recs .label { color: var(--brick); font-size: 10px; }
.recs .row { display: flex; gap: 12px; }
</style>

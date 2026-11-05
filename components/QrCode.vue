<!--
  Plain, scannable QR code as crisp SVG with a 4-module quiet zone.

    <QrCode url="https://example.com" class="w-24" />
-->
<script setup>
import { computed } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({
  url: { type: String, required: true },
})

const QUIET = 4

const qr = computed(() => {
  const { size, data } = QRCode.create(props.url, { errorCorrectionLevel: 'M' }).modules
  let d = ''
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      if (data[y * size + x]) d += `M${x} ${y}h1v1h-1z`
  return { size, d }
})
</script>

<template>
  <svg
    :viewBox="`${-QUIET} ${-QUIET} ${qr.size + QUIET * 2} ${qr.size + QUIET * 2}`"
    class="qr-code"
    shape-rendering="crispEdges"
    role="img"
    :aria-label="`QR code for ${url}`"
  >
    <rect :x="-QUIET" :y="-QUIET" width="100%" height="100%" class="qr-bg" />
    <path :d="qr.d" class="qr-fg" />
  </svg>
</template>

<style scoped>
.qr-code { display: block; }
.qr-bg { fill: var(--card, #fff); }
.qr-fg { fill: var(--ink, #000); }
</style>

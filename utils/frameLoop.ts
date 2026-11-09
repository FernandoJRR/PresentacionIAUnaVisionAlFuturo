import { computed, onUnmounted, ref, watch } from 'vue'
import { useIsSlideActive, useNav } from '@slidev/client'

/**
 * Discrete frame counter for pixel scenes.
 * Loops only while the slide is active; shows the last frame in print mode or with reduced motion.
 */
export function useFrameLoop(count: number, ms = 500) {
  const { isPrintMode } = useNav()
  const active = useIsSlideActive()
  const reduced = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches

  const still = computed(() => reduced || isPrintMode.value)
  const tick = ref(0)
  let id: ReturnType<typeof setInterval> | undefined

  watch([active, still], ([isActive, isStill]) => {
    clearInterval(id)
    tick.value = 0
    if (isActive && !isStill)
      id = setInterval(() => { tick.value = (tick.value + 1) % count }, ms)
  }, { immediate: true })

  onUnmounted(() => clearInterval(id))

  return computed(() => (still.value ? count - 1 : tick.value))
}

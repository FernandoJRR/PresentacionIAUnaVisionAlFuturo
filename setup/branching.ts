import { ref } from 'vue'
import { useNav } from '@slidev/client'

// Recuerda cuál fue el último camino visitado ('manana' | 'tarde')
// para que al retroceder desde la diapositiva de cierre ('cierre')
// regrese exactamente a la última diapositiva del camino que se estaba presentando.
export const activePath = ref<'manana' | 'tarde'>('manana')

export function useBranchingNav() {
  const {
    slides,
    currentSlideNo,
    currentFrontmatter,
    clicks,
    clicksStart,
    clicksTotal,
    next,
    prev,
    go,
  } = useNav()

  function getSlideByAlias(alias: string) {
    return slides.value.find(s => s.meta?.slide?.frontmatter?.routeAlias === alias)
  }

  function getPathBounds() {
    const forkNo = getSlideByAlias('bifurcacion')?.no ?? 4
    const p1Start = getSlideByAlias('camino-manana')?.no ?? (forkNo + 1)
    const p2Start = getSlideByAlias('camino-tarde')?.no ?? (p1Start + 2)
    const cierreNo = getSlideByAlias('cierre')?.no ?? slides.value.length

    return {
      forkNo,
      p1Start,
      p1End: p2Start - 1,
      p2Start,
      p2End: cierreNo - 1,
      cierreNo,
    }
  }

  function syncActivePath(no = currentSlideNo.value) {
    const { p1Start, p1End, p2Start, p2End } = getPathBounds()
    if (no >= p1Start && no <= p1End)
      activePath.value = 'manana'
    else if (no >= p2Start && no <= p2End)
      activePath.value = 'tarde'
  }

  function isForkSlide(no = currentSlideNo.value) {
    return currentFrontmatter.value?.routeAlias === 'bifurcacion' || no === getPathBounds().forkNo
  }

  function getPrevTargetSlide(no = currentSlideNo.value): number | null {
    syncActivePath(no)
    const { forkNo, p1Start, p1End, p2Start, p2End, cierreNo } = getPathBounds()

    if (no <= 1)
      return null

    // La primera de Camino 1 y la primera de Camino 2 regresan siempre al Cruce de Caminos (slide 4)
    if (no === p1Start || no === p2Start)
      return forkNo

    // Si estamos en el Cierre, regresar a la última del camino activo
    if (no === cierreNo)
      return activePath.value === 'tarde' ? p2End : p1End

    return no - 1
  }

  function getNextTargetSlide(no = currentSlideNo.value): number | null {
    syncActivePath(no)
    const { forkNo, p1End, p2End, cierreNo } = getPathBounds()

    // En el Cruce de Caminos (slide 4) se debe elegir explícitamente uno de los dos caminos
    if (no === forkNo)
      return null

    // La última del Camino 1 y la última del Camino 2 convergen en el Cierre (o siguiente común)
    if (no === p1End || no === p2End)
      return cierreNo

    if (no >= slides.value.length)
      return null

    return no + 1
  }

  async function smartPrev(slideOnly = false) {
    syncActivePath()
    if (!slideOnly && clicks.value > clicksStart.value) {
      await prev()
      return
    }
    const target = getPrevTargetSlide()
    if (target != null)
      await go(target)
  }

  async function smartNext(slideOnly = false) {
    syncActivePath()
    // En la diapositiva de bifurcación no se avanza con flecha siguiente
    if (isForkSlide())
      return

    if (!slideOnly && clicks.value < clicksTotal.value) {
      await next()
      return
    }
    const target = getNextTargetSlide()
    if (target != null)
      await go(target)
  }

  return {
    activePath,
    isForkSlide,
    getPrevTargetSlide,
    getNextTargetSlide,
    smartPrev,
    smartNext,
    syncActivePath,
  }
}

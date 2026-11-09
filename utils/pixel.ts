// Pixel-grid geometry helpers shared by the scenes.

/** Bresenham line: integer cells from (x0, y0) to (x1, y1). */
export function line(x0: number, y0: number, x1: number, y1: number): [number, number][] {
  const out: [number, number][] = []
  const dx = Math.abs(x1 - x0)
  const dy = -Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx + dy
  while (true) {
    out.push([x0, y0])
    if (x0 === x1 && y0 === y1) break
    const e2 = 2 * err
    if (e2 >= dy) { err += dy; x0 += sx }
    if (e2 <= dx) { err += dx; y0 += sy }
  }
  return out
}

/** Deterministic PRNG (mulberry32) so procedural art is identical on every render. */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Intensity 0..1 to a 4-step palette color. */
export function heat(v: number) {
  if (v >= 0.75) return 'var(--crimson)'
  if (v >= 0.5) return 'var(--vermilion)'
  if (v >= 0.25) return 'var(--gold)'
  return 'var(--vellum)'
}

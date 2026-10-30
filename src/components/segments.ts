// The segmented bar of Slider. Pure.

/** How many segments the bar is drawn in: one per step, at most 20. Pure. */
export function segmentCount(min: number, max: number, step: number): number {
  const steps = Math.round((max - min) / step)
  if (steps <= 20) return Math.max(1, steps)
  for (const n of [20, 16, 12, 10, 8]) if (steps % n === 0) return n
  return 10
}

/**
 * The row (0, 1 or 2) of each mark's label: each label goes on the first row where it is at least
 * `gap` percent from the previous label of that row (else the row where it is farthest), so close
 * values (water 5, stone 10, glass 11, plastic 13) stay readable.
 */
export function markRows(percents: readonly number[], gap = 12, rowCount = 3): number[] {
  const last = Array<number>(rowCount).fill(-Infinity)
  return percents.map((p) => {
    const distances = last.map((l) => p - l)
    let row = distances.findIndex((d) => d >= gap)
    if (row < 0) row = distances.indexOf(Math.max(...distances))
    last[row] = p
    return row
  })
}

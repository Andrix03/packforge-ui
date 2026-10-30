// Turns an icon source into SVG paths on a 16×16 grid. A source is either
//   { a: 'M0 0h1v1h-1z…', b: '…' }            ready paths (the icons PackForge already had),
//   { a: [ops…], b: [ops…] }                    drawing operations, or
//   { rows: ['....##..', …] }                   16 rows: '#' full colour, '+' shade, '.' empty.
// Operations: ['p', x, y], ['rect', x, y, w, h], ['box', x, y, w, h] (1 px outline),
// ['line', x0, y0, x1, y1, thickness?], ['disc' | 'ring' | 'cutdisc', cx, cy, r],
// ['cutrect', x, y, w, h] (cut* remove cells drawn before). Pure.

export const SIZE = 16

/** The cells (y * 16 + x) a list of operations paints. */
export function paint(ops) {
  const cells = new Set()
  const p = (x, y) => {
    if (x >= 0 && y >= 0 && x < SIZE && y < SIZE) cells.add(y * SIZE + x)
  }
  const rect = (x, y, w, h) => {
    for (let i = x; i < x + w; i++) for (let j = y; j < y + h; j++) p(i, j)
  }
  for (const [op, ...a] of ops) {
    switch (op) {
      case 'p':
        p(a[0], a[1])
        break
      case 'rect':
        rect(a[0], a[1], a[2], a[3])
        break
      case 'box': {
        const [x, y, w, h] = a
        rect(x, y, w, 1)
        rect(x, y + h - 1, w, 1)
        rect(x, y, 1, h)
        rect(x + w - 1, y, 1, h)
        break
      }
      case 'line': {
        const [x0, y0, x1, y1, t = 1] = a
        const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1
        for (let i = 0; i <= n; i++)
          rect(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), t, t)
        break
      }
      case 'disc':
      case 'ring':
      case 'cutdisc': {
        const [cx, cy, r] = a
        for (let x = 0; x < SIZE; x++)
          for (let y = 0; y < SIZE; y++) {
            const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy)
            if (op === 'disc' && d <= r) p(x, y)
            if (op === 'ring' && d <= r && d > r - 1.2) p(x, y)
            if (op === 'cutdisc' && d <= r) cells.delete(y * SIZE + x)
          }
        break
      }
      case 'cutrect': {
        const [x, y, w, h] = a
        for (let i = x; i < x + w; i++) for (let j = y; j < y + h; j++) cells.delete(j * SIZE + i)
        break
      }
      default:
        throw new Error(`unknown icon operation "${op}"`)
    }
  }
  return cells
}

/** The cells of `rows` holding `char`. */
export function fromRows(rows, char) {
  if (rows.length !== SIZE || rows.some((row) => row.length !== SIZE))
    throw new Error('icon rows must be 16 × 16')
  const cells = new Set()
  rows.forEach((row, y) => {
    for (let x = 0; x < SIZE; x++) if (row[x] === char) cells.add(y * SIZE + x)
  })
  return cells
}

/** Cells as an SVG path of horizontal runs, the format PackForge's icons use. */
export function toPath(cells) {
  let d = ''
  for (let y = 0; y < SIZE; y++) {
    let x = 0
    while (x < SIZE) {
      if (!cells.has(y * SIZE + x)) {
        x++
        continue
      }
      let w = 1
      while (x + w < SIZE && cells.has(y * SIZE + x + w)) w++
      d += `M${x} ${y}h${w}v1h-${w}z`
      x += w
    }
  }
  return d
}

/** Paths { a, b } of any icon source. */
export function iconPaths(source) {
  if (source.rows)
    return { a: toPath(fromRows(source.rows, '#')), b: toPath(fromRows(source.rows, '+')) }
  if (typeof source.a === 'string') return { a: source.a, b: source.b ?? '' }
  return { a: toPath(paint(source.a ?? [])), b: toPath(paint(source.b ?? [])) }
}

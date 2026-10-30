import { describe, expect, it } from 'vitest'
import { fromRows, iconPaths, paint, toPath } from './icon-paint.mjs'

const EMPTY = '................'

describe('icon paint', () => {
  it('writes runs of cells as one rectangle each', () => {
    expect(toPath(paint([['rect', 2, 3, 4, 1]]))).toBe('M2 3h4v1h-4z')
    expect(
      toPath(
        paint([
          ['p', 0, 0],
          ['p', 2, 0]
        ])
      )
    ).toBe('M0 0h1v1h-1zM2 0h1v1h-1z')
  })

  it('draws a 1 px box and cuts cells', () => {
    const box = paint([['box', 0, 0, 3, 3]])
    expect(box.size).toBe(8)
    expect(box.has(1 * 16 + 1)).toBe(false)
    expect(
      paint([
        ['rect', 0, 0, 4, 1],
        ['cutrect', 1, 0, 2, 1]
      ]).size
    ).toBe(2)
  })

  it('keeps every cell inside the 16 × 16 grid', () => {
    const cells = paint([
      ['rect', 14, 14, 5, 5],
      ['disc', 8, 8, 20]
    ])
    expect([...cells].every((c) => c >= 0 && c < 256)).toBe(true)
  })

  it('reads hand-drawn rows: # full, + shade', () => {
    const rows = [...Array(16)].map((_, y) => (y === 1 ? '.#+.............' : EMPTY))
    expect(iconPaths({ rows })).toEqual({ a: 'M1 1h1v1h-1z', b: 'M2 1h1v1h-1z' })
    expect(() => fromRows(['#'], '#')).toThrow()
  })

  it('keeps ready paths as they are', () => {
    expect(iconPaths({ a: 'M0 0h1v1h-1z' })).toEqual({ a: 'M0 0h1v1h-1z', b: '' })
  })
})

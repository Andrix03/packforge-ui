import { describe, expect, it } from 'vitest'
import { THEMES, contrast, cssVar, themeDeclarations } from './tokens'

const hex = /^#[0-9a-f]{6}$/

describe('themes', () => {
  it('define the same tokens', () => {
    expect(Object.keys(THEMES.pulito).sort()).toEqual(Object.keys(THEMES.minecraft).sort())
  })

  it('name the CSS variables in kebab case', () => {
    expect(cssVar('accentHi')).toBe('--pf-accent-hi')
    expect(themeDeclarations('minecraft')).toContain('--pf-text-muted: #b3ada2;')
  })

  // WCAG AA for text (4.5:1) on every surface text sits on, in both themes.
  for (const [name, t] of Object.entries(THEMES)) {
    it(`${name}: readable text on every surface`, () => {
      for (const surface of [t.ground, t.panel, t.panelHeader, t.raised, t.sunken]) {
        for (const ink of [t.text, t.textMuted, t.textFaint, t.accentText, t.dangerText]) {
          expect(hex.test(ink) && hex.test(surface)).toBe(true)
          expect(contrast(ink, surface), `${ink} on ${surface}`).toBeGreaterThanOrEqual(4.5)
        }
      }
      expect(contrast(t.onAccent, t.accent)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(t.onStone, t.stone)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(t.onDangerSolid, t.dangerSolid)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(t.danger, t.stone), 'danger text on a normal button').toBeGreaterThanOrEqual(
        4.5
      )
    })
  }

  it('computes contrast like WCAG', () => {
    expect(contrast('#ffffff', '#000000')).toBeCloseTo(21, 1)
    expect(contrast('#777777', '#777777')).toBe(1)
  })
})

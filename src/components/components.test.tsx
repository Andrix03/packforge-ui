import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Icon } from '../icons/Icon'
import { ICON_NAMES } from '../icons/names'
import { ICON_DATA } from '../icons/data'
import { Button, IconButton } from './Button'
import { Checkbox } from './Checkbox'
import { Panel } from './Panel'
import { Slider } from './Slider'
import { markRows, segmentCount } from './segments'
import { Tabs } from './Tabs'
import { TextField } from './TextField'
import { Toggle } from './Toggle'

const noop = (): void => {}
const html = (node: React.ReactNode): string => renderToStaticMarkup(node)

describe('Button', () => {
  it('is a plain button of its level, never a form submit by default', () => {
    const out = html(<Button variant="main">Esporta</Button>)
    expect(out).toContain('type="button"')
    expect(out).toContain('pf-button-main')
  })

  it('names an icon-only button for screen readers and in its tooltip', () => {
    const out = html(<IconButton icon="undo" label="Annulla" shortcut="Ctrl+Z" />)
    expect(out).toContain('aria-label="Annulla"')
    expect(out).toContain('title="Annulla (Ctrl+Z)"')
  })
})

describe('fields', () => {
  it('ties the label, hint and error to the input', () => {
    const out = html(
      <TextField label="Nome" value="stone" onValueChange={noop} hint="Come nel gioco" error="No" />
    )
    const id = /<input id="([^"]+)"/.exec(out)?.[1]
    expect(id).toBeTruthy()
    expect(out).toContain(`for="${id}"`)
    expect(out).toContain(`aria-describedby="${id}-h ${id}-e"`)
    expect(out).toContain('aria-invalid="true"')
  })

  it('gives the toggle and the checkbox a clickable label', () => {
    for (const out of [
      html(<Toggle checked onCheckedChange={noop} label="Mipmap" description="Come nel gioco" />),
      html(<Checkbox checked={false} onCheckedChange={noop} label="Sovrascrivi" />)
    ]) {
      const id = /<label for="([^"]+)"/.exec(out)?.[1]
      expect(id).toBeTruthy()
      expect(out).toContain(`id="${id}"`)
    }
  })

  it('shows the slider value and its typical values', () => {
    const out = html(
      <Slider
        label="F0"
        value={10}
        onValueChange={noop}
        max={30}
        marks={[{ value: 5, label: 'acqua' }]}
      />
    )
    expect(out).toContain('acqua')
    expect(out).toContain('>10<')
  })

  it('moves labels of close typical values to a second row', () => {
    // LabPBR F0 on 0-30: water 5, stone 10, glass 11, plastic 13.
    expect(markRows([16.7, 33.3, 36.7, 43.3])).toEqual([0, 0, 1, 2])
    expect(markRows([10, 50, 90])).toEqual([0, 0, 0])
  })

  it('splits the slider bar in at most 20 segments', () => {
    expect(segmentCount(0, 10, 1)).toBe(10)
    expect(segmentCount(0, 255, 1)).toBe(10)
    expect(segmentCount(0, 100, 1)).toBe(20)
    expect(segmentCount(0, 1, 1)).toBe(1)
  })
})

describe('structure', () => {
  it('labels the tab list and marks the active tab', () => {
    const out = html(
      <Tabs
        label="Cosa dipingi"
        value="n"
        onValueChange={noop}
        tabs={[
          { value: 'c', label: 'Colore' },
          { value: 'n', label: 'Rilievo _n', dirty: true }
        ]}
      />
    )
    expect(out).toContain('aria-label="Cosa dipingi"')
    expect(out).toContain('role="tab"')
    expect(out).toContain('pf-tab-dirty')
  })

  it('titles a panel with a heading', () => {
    expect(html(<Panel title="Anteprima">x</Panel>)).toContain(
      '<h3 class="pf-panel-title pf-label">'
    )
  })
})

describe('icons', () => {
  it('are decoration unless titled', () => {
    expect(html(<Icon name="save" />)).toContain('aria-hidden="true"')
    expect(html(<Icon name="save" title="Salva" />)).toContain('aria-label="Salva"')
  })

  it('all have a full-colour path inside the 16 × 16 grid', () => {
    expect(ICON_NAMES.length).toBeGreaterThan(100)
    for (const name of ICON_NAMES) {
      const { a, b } = ICON_DATA[name]
      expect(a.length, name).toBeGreaterThan(0)
      for (const [, x, y, w] of `${a}${b}`.matchAll(/M(\d+) (\d+)h(\d+)/g)) {
        expect(Number(x) + Number(w), name).toBeLessThanOrEqual(16)
        expect(Number(y), name).toBeLessThan(16)
      }
    }
  })
})

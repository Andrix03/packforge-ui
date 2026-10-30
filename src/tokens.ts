// The two themes as design tokens. applyTheme() writes them as CSS custom properties
// (--pf-<kebab-name>) on <html>, so popups rendered in a portal get them too. Every component's
// CSS reads only these variables: a theme is nothing but this table. Pure.

export type ThemeName = 'minecraft' | 'pulito'

export interface Tokens {
  /** Surfaces, back to front. */
  ground: string
  panel: string
  panelHeader: string
  raised: string
  sunken: string
  /** Bevel edges (Minecraft) or plain borders (Pulito). */
  edgeLight: string
  edgeDark: string
  text: string
  textMuted: string
  textFaint: string
  /** The one main action per view (green). */
  accent: string
  accentHi: string
  accentLo: string
  onAccent: string
  accentText: string
  accentSoft: string
  /** Normal buttons: the stone of the game's menus. */
  stone: string
  stoneHover: string
  stonePressed: string
  stoneHi: string
  stoneLo: string
  onStone: string
  /** Destructive actions. */
  /** Red text on a normal (stone) button. */
  danger: string
  /** Red text on the dark surfaces (errors under a field). */
  dangerText: string
  dangerSolid: string
  dangerHi: string
  dangerLo: string
  onDangerSolid: string
  warn: string
  info: string
  focus: string
  controlBorder: string
  fieldBorder: string
  radius: string
  radiusLarge: string
  controlHeight: string
  textFont: string
  textSize: string
  labelFont: string
  labelSize: string
  labelWeight: string
  labelTransform: string
  labelSpacing: string
  monoFont: string
  fontSmoothing: string
  popupShadow: string
}

const PIXEL = "'PixelOperator', 'PixelOperatorMono', monospace"
const SANS = "'Noto Sans', 'Segoe UI', system-ui, sans-serif"

export const THEMES: Readonly<Record<ThemeName, Tokens>> = {
  minecraft: {
    ground: '#1d1d1d',
    panel: '#2c2c2c',
    panelHeader: '#333333',
    raised: '#3a3a3a',
    sunken: '#1b1b1b',
    edgeLight: '#5a5a5a',
    edgeDark: '#141414',
    text: '#ebe7e0',
    textMuted: '#b3ada2',
    textFaint: '#aca79e',
    accent: '#5f9e35',
    accentHi: '#8fd45a',
    accentLo: '#2e5418',
    onAccent: '#0f1e08',
    accentText: '#a8dd7c',
    accentSoft: '#3a5a2a',
    stone: '#d4d4d4',
    stoneHover: '#e6e6e6',
    stonePressed: '#c4c4c4',
    stoneHi: '#f4f4f4',
    stoneLo: '#8f8f8f',
    onStone: '#1d1d1d',
    danger: '#9a2a1a',
    dangerText: '#f2a090',
    dangerSolid: '#b8402e',
    dangerHi: '#e0705a',
    dangerLo: '#6e2014',
    onDangerSolid: '#fff4f0',
    warn: '#f2c94c',
    info: '#9cc8f2',
    focus: '#f2c94c',
    controlBorder: '2px solid #141414',
    fieldBorder: '#0e0e0e #4a4a4a #4a4a4a #0e0e0e',
    radius: '0px',
    radiusLarge: '0px',
    controlHeight: '32px',
    textFont: PIXEL,
    textSize: '16px',
    labelFont: "'Tiny5', monospace",
    labelSize: '10px',
    labelWeight: '400',
    labelTransform: 'uppercase',
    labelSpacing: '0.5px',
    monoFont: "'PixelOperatorMono', monospace",
    fontSmoothing: 'none',
    popupShadow: '4px 4px 0 rgba(0, 0, 0, 0.55)'
  },
  pulito: {
    ground: '#1c1d20',
    panel: '#26282c',
    panelHeader: '#26282c',
    raised: '#2f3237',
    sunken: '#18191c',
    edgeLight: '#3a3d43',
    edgeDark: '#3a3d43',
    text: '#e8e9ec',
    textMuted: '#b0b4bb',
    textFaint: '#9ea3ab',
    accent: '#367a26',
    accentHi: 'transparent',
    accentLo: 'transparent',
    onAccent: '#ffffff',
    accentText: '#8fd07a',
    accentSoft: '#26331f',
    stone: '#2f3237',
    stoneHover: '#383b41',
    stonePressed: '#26282c',
    stoneHi: 'transparent',
    stoneLo: 'transparent',
    onStone: '#e8e9ec',
    danger: '#f58474',
    dangerText: '#f58474',
    dangerSolid: '#c43d30',
    dangerHi: 'transparent',
    dangerLo: 'transparent',
    onDangerSolid: '#ffffff',
    warn: '#e8c25a',
    info: '#8ab8ec',
    focus: '#7fb8ff',
    controlBorder: '1px solid #3a3d43',
    fieldBorder: '#3a3d43',
    radius: '6px',
    radiusLarge: '10px',
    controlHeight: '32px',
    textFont: SANS,
    textSize: '14px',
    labelFont: SANS,
    labelSize: '13px',
    labelWeight: '600',
    labelTransform: 'none',
    labelSpacing: '0',
    monoFont: "ui-monospace, Consolas, 'Cascadia Mono', monospace",
    fontSmoothing: 'auto',
    popupShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
  }
}

/** `accentHi` → `--pf-accent-hi`. */
export const cssVar = (token: keyof Tokens): string =>
  `--pf-${token.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`

/** The theme as CSS declarations, for a stylesheet or a style attribute. */
export function themeDeclarations(name: ThemeName): string {
  return Object.entries(THEMES[name])
    .map(([key, value]) => `${cssVar(key as keyof Tokens)}: ${value};`)
    .join(' ')
}

/** WCAG contrast ratio of two #rrggbb colours (1 to 21). */
export function contrast(a: string, b: string): number {
  const luminance = (hex: string): number => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    }) as [number, number, number]
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

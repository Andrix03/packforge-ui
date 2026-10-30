import type { ThemeName } from '../src'

export const params = new URLSearchParams(location.search)

/** ?theme=pulito opens the gallery in that theme (a link to share, and for screenshots). */
export function initialTheme(): ThemeName {
  return params.get('theme') === 'pulito' ? 'pulito' : 'minecraft'
}

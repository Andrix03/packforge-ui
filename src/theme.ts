// Applies a theme to the whole document: the tokens as CSS variables on <html>, so components in
// portals (menus, dialogs, tooltips) are themed too, plus data-pf-theme for the few rules that
// differ in shape between the themes. The interface scale stays with the app (Electron's zoom).
import { THEMES, cssVar, type ThemeName, type Tokens } from './tokens'
// Fonts and page basics: imported here, the one module every app uses (index.ts only re-exports and
// is dropped as side-effect free).
import './styles/base.css'

export function applyTheme(name: ThemeName, root: HTMLElement = document.documentElement): void {
  for (const [key, value] of Object.entries(THEMES[name])) {
    root.style.setProperty(cssVar(key as keyof Tokens), value)
  }
  root.dataset['pfTheme'] = name
}

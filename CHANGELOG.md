# Changelog

## 0.1.1 — 2026-10-30

- Dialog: `title` is optional, with `label` for a window that draws its own heading;
  `dismissible={false}` keeps it open while work runs; `className` for the app's layout; the
  width comes from CSS unless `width` is given.
- Two windows open at once (a question over a dialog): Esc closes only the one on top, and the
  window underneath stops trapping the focus and the clicks until the top one closes.
- The page look (background, font) is opt-in with the `pf-root` class: the kit no longer styles
  `<body>` by itself.
- Workflows on the current versions of the GitHub actions.

## 0.1.0 — 2026-10-30

- Two themes as design tokens, Minecraft and Pulito, with a contrast test on every text colour.
- Components: Button, IconButton, Toggle, Checkbox, Slider, TextField, Select, Tabs, Dialog,
  Panel, Icon.
- 116 pixel icons: the 84 PackForge already had and 32 new ones (files, state, compare and
  differences, palette, layers, light and weather, PBR maps, lists, app).
- A gallery of every component and icon, built for GitHub Pages.

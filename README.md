# packforge-ui

Minecraft-style React components for [PackForge](https://github.com/Andrix03/packforge), the
resource pack studio. Pixel controls on flat work surfaces, two themes and a set of pixel icons.

Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft. Every
icon, font and colour here is drawn or chosen for this project: no Mojang assets.

## What is in it

- **Two themes.** _Minecraft_ (bevelled stone buttons, Pixel Operator and Tiny5) and _Pulito_
  (flat, Noto Sans), for people who work in the app all day. Both are a table of design tokens
  (`src/tokens.ts`); a test keeps every text colour at 4.5:1 contrast or more on every surface.
- **Components** on [Base UI](https://base-ui.com) primitives, so keyboard use, focus and screen
  readers work: `Button` (main, normal, quiet, danger), `IconButton`, `Toggle`, `Checkbox`,
  `Slider` (in steps, with clickable typical values), `TextField`, `Select`, `Tabs`, `Dialog`,
  `Panel`.
- **Icons.** 116 pixel icons on a 16 × 16 grid, two tones, at 16 or 32 px (`<Icon name="save" />`).
- The kit does not translate: every text comes from the app.

## Use it

PackForge takes it as a git dependency pinned to a tag:

```sh
npm install github:Andrix03/packforge-ui#v0.1.0
```

```tsx
import 'packforge-ui/styles.css'
import { applyTheme, Button, Panel } from 'packforge-ui'

applyTheme('minecraft') // or 'pulito'

export function Export(): React.JSX.Element {
  return (
    <Panel title="Export">
      <Button variant="main" icon="download">
        Export the pack
      </Button>
    </Panel>
  )
}
```

`applyTheme` writes the tokens on `<html>`, so menus and dialogs opened in a portal are themed
too. Add the `pf-root` class to `<body>` (or a container) for the theme's page background and font. The interface scale belongs to the app (Electron's zoom factor).

## Work on it

```sh
npm install
npm run gallery   # every component and icon, live
npm run check     # icons, format, types, lint, tests, builds: one line each
npm run build     # dist/: index.js, styles.css (fonts inside), types
```

Icons live in `icons/*.json` (ready paths, drawing operations or hand-drawn rows, see
`scripts/icon-paint.mjs`); `npm run icons` regenerates `src/icons/data.ts`.

Work happens on `dev`; `main` only gets finished versions, tagged `vX.Y.Z`.

## Licence

MIT. Fonts: Pixel Operator (CC0), Tiny5 (SIL OFL 1.1); their licence files are in `src/fonts`.

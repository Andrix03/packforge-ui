// The component gallery (npm run gallery).
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyTheme } from '../src'
import { Gallery } from './Gallery'
import { initialTheme } from './params'

applyTheme(initialTheme())
document.body.classList.add('pf-root')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gallery />
  </StrictMode>
)

// A pixel icon from the set (icons/*.json → data.ts): 16×16 two-tone, full colour and a 45 % shade,
// both in currentColor. Only at 16 or 32 px: other sizes blur the pixels.
import { ICON_DATA } from './data'
import type { IconName } from './names'

export type { IconName }

export interface IconProps {
  name: IconName
  size?: 16 | 32
  /** Read by screen readers; without it the icon is decoration. */
  title?: string
  className?: string
}

export function Icon({ name, size = 16, title, className }: IconProps): React.JSX.Element {
  const { a, b } = ICON_DATA[name]
  return (
    <svg
      className={className ? `pf-icon ${className}` : 'pf-icon'}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      {b && <path d={b} fill="currentColor" opacity={0.45} />}
      <path d={a} fill="currentColor" />
    </svg>
  )
}

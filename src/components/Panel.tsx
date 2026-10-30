// A panel: a titled box with optional actions at the right of its title (bevelled in Minecraft,
// a plain rounded box in Pulito).
import './Panel.css'

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode
  /** Small controls at the right of the title (an IconButton to close, a count…). */
  actions?: React.ReactNode
  /** No padding inside: for lists and grids that run to the edges. */
  flush?: boolean
}

export function Panel({
  title,
  actions,
  flush = false,
  className,
  children,
  ...rest
}: PanelProps): React.JSX.Element {
  return (
    <section className={`pf-panel${className ? ` ${className}` : ''}`} {...rest}>
      <header className="pf-panel-header">
        <h3 className="pf-panel-title pf-label">{title}</h3>
        {actions && <div className="pf-panel-actions">{actions}</div>}
      </header>
      <div className={flush ? 'pf-panel-body pf-panel-flush' : 'pf-panel-body'}>{children}</div>
    </section>
  )
}

// A modal window (Base UI Dialog: focus kept inside, Esc and the backdrop close it, focus goes back
// to what opened it). Either give `title` (and `description`, `actions`: the buttons, main one
// last), or draw the whole content as children with a `label` for screen readers.
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { useEffect, useId, useSyncExternalStore } from 'react'
import './Dialog.css'

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The heading drawn at the top. Without it, give `label`. */
  title?: React.ReactNode
  /** The window's name for screen readers, when it draws its own heading. */
  label?: string
  description?: React.ReactNode
  /** Buttons at the bottom right, the main one last. */
  actions?: React.ReactNode
  /** `alert`: a question that must be answered (no closing by the backdrop). */
  kind?: 'dialog' | 'alert'
  /** false while work is running: Esc and the backdrop do nothing. */
  dismissible?: boolean
  /** Width in px; without it the window takes the width its className gives. */
  width?: number
  /** Extra classes on the window, for the app's own layout of its content. */
  className?: string
  children?: React.ReactNode
}

export function Dialog({
  open,
  onOpenChange,
  title,
  label,
  description,
  actions,
  kind = 'dialog',
  dismissible = true,
  width,
  className,
  children
}: DialogProps): React.JSX.Element {
  const id = useId()
  useEffect(() => {
    if (!open) return
    openOrder = [...openOrder, id]
    emit()
    return () => {
      const at = openOrder.lastIndexOf(id)
      openOrder = [...openOrder.slice(0, at), ...openOrder.slice(at + 1)]
      emit()
    }
  }, [open, id])
  const top = useSyncExternalStore(subscribe, () => openOrder.at(-1))
  // A window covered by another one lets it have the focus and the clicks: it stops trapping the
  // focus until the one on top closes (Base UI does not know they are stacked).
  const covered = open && top !== undefined && top !== id
  return (
    <BaseDialog.Root
      open={open}
      onOpenChange={(next, details) => {
        // Windows opened by separate parts of an app are not nested for Base UI: each one hears the
        // Esc. Only the one on top (the last opened) answers it.
        if (!next && details.reason === 'escape-key' && covered) return
        if (next || dismissible) onOpenChange(next)
      }}
      disablePointerDismissal={kind === 'alert' || !dismissible || covered}
      modal={!covered}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="pf-dialog-backdrop" />
        <BaseDialog.Popup
          className={`pf-popup pf-dialog${className ? ` ${className}` : ''}`}
          role={kind === 'alert' ? 'alertdialog' : 'dialog'}
          aria-label={label}
          style={width ? { width: `min(${width}px, calc(100vw - 32px))` } : undefined}
        >
          {title && (
            <BaseDialog.Title className="pf-dialog-title pf-label">{title}</BaseDialog.Title>
          )}
          {description && (
            <BaseDialog.Description className="pf-dialog-description">
              {description}
            </BaseDialog.Description>
          )}
          {children}
          {actions && <div className="pf-dialog-actions">{actions}</div>}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

/**
 * The open windows, in the order they opened (the page order of their portals is not reliable:
 * Base UI may reuse one created earlier).
 */
let openOrder: readonly string[] = []
const listeners = new Set<() => void>()
const emit = (): void => listeners.forEach((listener) => listener())
const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

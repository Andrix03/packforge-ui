// A modal window (Base UI Dialog: focus kept inside, Esc and the backdrop close it, focus goes back
// to what opened it). Either give `title` (and `description`, `actions`: the buttons, main one
// last), or draw the whole content as children with a `label` for screen readers.
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { useRef } from 'react'
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
  const popup = useRef<HTMLDivElement>(null)
  return (
    <BaseDialog.Root
      open={open}
      onOpenChange={(next, details) => {
        // Windows opened by separate parts of an app are not nested for Base UI: each one hears the
        // Esc. Only the one on top (the last in the page) answers it.
        if (!next && details.reason === 'escape-key' && !onTop(popup.current)) return
        if (next || dismissible) onOpenChange(next)
      }}
      disablePointerDismissal={kind === 'alert' || !dismissible}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="pf-dialog-backdrop" />
        <BaseDialog.Popup
          ref={popup}
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

/** Whether this window is the last open one in the page, the one the user sees on top. */
function onTop(element: HTMLElement | null): boolean {
  const windows = document.querySelectorAll('.pf-dialog')
  return element === null || windows[windows.length - 1] === element
}

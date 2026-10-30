// A modal window (Base UI Dialog: focus kept inside, Esc and the backdrop close it, focus goes back
// to what opened it). The buttons go in `actions`, the main one last.
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import './Dialog.css'

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  /** Buttons at the bottom right, the main one last. */
  actions?: React.ReactNode
  /** `alert`: a question that must be answered (no closing by the backdrop). */
  kind?: 'dialog' | 'alert'
  width?: number
  children?: React.ReactNode
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  actions,
  kind = 'dialog',
  width = 460,
  children
}: DialogProps): React.JSX.Element {
  return (
    <BaseDialog.Root
      open={open}
      onOpenChange={(next) => onOpenChange(next)}
      disablePointerDismissal={kind === 'alert'}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="pf-dialog-backdrop" />
        <BaseDialog.Popup
          className="pf-popup pf-dialog"
          role={kind === 'alert' ? 'alertdialog' : 'dialog'}
          style={{ width: `min(${width}px, calc(100vw - 32px))` }}
        >
          <BaseDialog.Title className="pf-dialog-title pf-label">{title}</BaseDialog.Title>
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

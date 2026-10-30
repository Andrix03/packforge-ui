// An on/off switch with its line of text, so it says what it does without being opened. Minecraft:
// the O / I cells of the game's options; Pulito: a pill. Base UI Switch underneath (keyboard, form).
import { Switch } from '@base-ui/react/switch'
import { useId } from 'react'
import './Toggle.css'

export interface ToggleProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: React.ReactNode
  /** A second, quieter line under the label. */
  description?: React.ReactNode
  disabled?: boolean
}

export function Toggle({
  checked,
  onCheckedChange,
  label,
  description,
  disabled = false
}: ToggleProps): React.JSX.Element {
  const id = useId()
  return (
    <div className="pf-toggle">
      <Switch.Root
        id={id}
        className="pf-switch"
        checked={checked}
        disabled={disabled}
        onCheckedChange={(next) => onCheckedChange(next)}
        aria-describedby={description ? `${id}-d` : undefined}
      >
        <span className="pf-switch-o" aria-hidden="true">
          O
        </span>
        <span className="pf-switch-i" aria-hidden="true">
          I
        </span>
        <Switch.Thumb className="pf-switch-thumb" />
      </Switch.Root>
      <label htmlFor={id} className="pf-toggle-text">
        <span>{label}</span>
        {description && (
          <span id={`${id}-d`} className="pf-muted pf-toggle-description">
            {description}
          </span>
        )}
      </label>
    </div>
  )
}

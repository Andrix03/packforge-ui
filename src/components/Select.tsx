// A choice from a list (Base UI Select: typing to jump, arrows, Esc). Each option may carry a hint
// shown at its right, e.g. a version's pack format.
import { Select as BaseSelect } from '@base-ui/react/select'
import { Icon } from '../icons/Icon'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
  hint?: string
}

export interface SelectProps {
  label: React.ReactNode
  value: string
  onValueChange: (value: string) => void
  options: readonly SelectOption[]
  disabled?: boolean
}

export function Select({
  label,
  value,
  onValueChange,
  options,
  disabled = false
}: SelectProps): React.JSX.Element {
  return (
    <BaseSelect.Root
      items={options.map((o) => ({ value: o.value, label: o.label }))}
      value={value}
      disabled={disabled}
      onValueChange={(next) => {
        if (typeof next === 'string') onValueChange(next)
      }}
    >
      <div className="pf-field">
        <BaseSelect.Label className="pf-muted">{label}</BaseSelect.Label>
        <BaseSelect.Trigger className="pf-select-trigger">
          <BaseSelect.Value />
          <BaseSelect.Icon className="pf-select-icon">
            <Icon name="caretDown" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </div>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="pf-select-positioner" sideOffset={4}>
          <BaseSelect.Popup className="pf-popup pf-select-popup">
            <BaseSelect.List>
              {options.map((option) => (
                <BaseSelect.Item key={option.value} value={option.value} className="pf-select-item">
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  {option.hint && <span className="pf-select-hint pf-mono">{option.hint}</span>}
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

// A checkbox with its label (Base UI Checkbox: keyboard and form behaviour included).
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { useId } from 'react'
import { Icon } from '../icons/Icon'
import './Checkbox.css'

export interface CheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: React.ReactNode
  disabled?: boolean
}

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled = false
}: CheckboxProps): React.JSX.Element {
  const id = useId()
  return (
    <div className="pf-checkbox">
      <BaseCheckbox.Root
        id={id}
        className="pf-checkbox-box"
        checked={checked}
        disabled={disabled}
        onCheckedChange={(next) => onCheckedChange(next)}
      >
        <BaseCheckbox.Indicator className="pf-checkbox-mark">
          <Icon name="check" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

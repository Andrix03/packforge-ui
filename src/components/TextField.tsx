// A text input with its label above, an optional hint and an error under it (read by screen
// readers through aria-describedby).
import { useId } from 'react'
import './TextField.css'

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  label: React.ReactNode
  value: string
  onValueChange: (value: string) => void
  hint?: React.ReactNode
  error?: React.ReactNode
  /** Numbers, hex colours, paths: the monospaced font. */
  mono?: boolean
  ref?: React.Ref<HTMLInputElement>
}

export function TextField({
  label,
  value,
  onValueChange,
  hint,
  error,
  mono = false,
  className,
  ...rest
}: TextFieldProps): React.JSX.Element {
  const id = useId()
  const described = [hint ? `${id}-h` : '', error ? `${id}-e` : ''].filter(Boolean).join(' ')
  return (
    <div className={`pf-field${className ? ` ${className}` : ''}`}>
      <label htmlFor={id} className="pf-muted">
        {label}
      </label>
      <input
        id={id}
        className={mono ? 'pf-input pf-mono' : 'pf-input'}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={described || undefined}
        onChange={(event) => onValueChange(event.target.value)}
        {...rest}
      />
      {hint && (
        <span id={`${id}-h`} className="pf-field-hint">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-e`} className="pf-field-error">
          {error}
        </span>
      )}
    </div>
  )
}

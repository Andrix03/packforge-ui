// Buttons in four levels, like Ore UI's: `main` (green, one per view), `normal` (the game's stone),
// `quiet` (text only) and `danger` (red text; `dangerSolid` only inside the question that confirms).
import { Icon, type IconName } from '../icons/Icon'
import './Button.css'

export type ButtonVariant = 'main' | 'normal' | 'quiet' | 'danger' | 'dangerSolid'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: IconName
  ref?: React.Ref<HTMLButtonElement>
}

export function Button({
  variant = 'normal',
  icon,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      className={`pf-button pf-button-${variant} pf-label${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon'> {
  icon: IconName
  /** Says what it does: aria-label and tooltip. */
  label: string
  /** Shown after the label in the tooltip, e.g. "Ctrl+Z". */
  shortcut?: string
}

export function IconButton({
  icon,
  label,
  shortcut,
  className,
  ...rest
}: IconButtonProps): React.JSX.Element {
  return (
    <Button
      icon={icon}
      aria-label={label}
      title={shortcut ? `${label} (${shortcut})` : label}
      className={`pf-icon-button${className ? ` ${className}` : ''}`}
      {...rest}
    />
  )
}

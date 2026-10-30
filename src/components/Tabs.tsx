// Tabs (Base UI Tabs: arrows move between them). The app draws the content for the chosen value;
// a tab may carry an icon and a dot that marks unsaved changes.
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { Icon, type IconName } from '../icons/Icon'
import './Tabs.css'

export interface TabItem {
  value: string
  label: string
  icon?: IconName
  /** A small dot after the label: this tab has unsaved changes. */
  dirty?: boolean
  disabled?: boolean
}

export interface TabsProps {
  /** Read by screen readers: what the tabs choose. */
  label: string
  value: string
  onValueChange: (value: string) => void
  tabs: readonly TabItem[]
}

export function Tabs({ label, value, onValueChange, tabs }: TabsProps): React.JSX.Element {
  return (
    <BaseTabs.Root
      value={value}
      onValueChange={(next) => {
        if (typeof next === 'string') onValueChange(next)
      }}
    >
      <BaseTabs.List className="pf-tabs" aria-label={label}>
        {tabs.map((tab) => (
          <BaseTabs.Tab
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled ?? false}
            className="pf-tab pf-label"
          >
            {tab.icon && <Icon name={tab.icon} />}
            {tab.label}
            {tab.dirty && <span className="pf-tab-dirty" aria-label="*" />}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
    </BaseTabs.Root>
  )
}

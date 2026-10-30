import { ICON_DATA } from './data'

export type IconName = keyof typeof ICON_DATA

/** Every icon of the set, in name order. */
export const ICON_NAMES = Object.keys(ICON_DATA) as IconName[]

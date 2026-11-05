import type { NavOperations, ShortcutOptions } from '@slidev/types'
import { defineShortcutsSetup } from '@slidev/types'
import { useBranchingNav } from './branching'

export default defineShortcutsSetup((nav: NavOperations, base: ShortcutOptions[]) => {
  const { smartNext, smartPrev } = useBranchingNav()

  return base.map((shortcut) => {
    if (['next_space', 'next_right', 'next_page_key'].includes(shortcut.name || '')) {
      return {
        ...shortcut,
        fn: () => smartNext(false),
      }
    }
    if (['next_down', 'next_shift'].includes(shortcut.name || '')) {
      return {
        ...shortcut,
        fn: () => smartNext(true),
      }
    }
    if (['prev_space', 'prev_left', 'prev_page_key'].includes(shortcut.name || '')) {
      return {
        ...shortcut,
        fn: () => smartPrev(false),
      }
    }
    if (['prev_up', 'prev_shift'].includes(shortcut.name || '')) {
      return {
        ...shortcut,
        fn: () => smartPrev(true),
      }
    }
    return shortcut
  })
})

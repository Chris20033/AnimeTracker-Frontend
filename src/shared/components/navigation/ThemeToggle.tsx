import { useEffect } from 'react'
import { applyTheme, useThemeStore } from '@/store/theme.store'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const isDark = theme === 'dark'
  const iconId = isDark ? 'sun-icon' : 'moon-icon'

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <button
      type="button"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 text-sm font-black text-[var(--muted)] shadow-[0_14px_32px_var(--shadow)] outline-none transition hover:bg-[var(--surface-strong)] hover:text-[var(--page-fg)] focus:ring-4 focus:ring-[var(--focus)] sm:min-h-11 sm:px-3 sm:py-2"
    >
      <span className="grid size-6 place-items-center rounded-full bg-[var(--surface-inset)] text-[var(--accent-strong)] sm:size-7" aria-hidden="true">
        <svg className="size-3.5 sm:size-4">
          <use href={`/icons.svg#${iconId}`} />
        </svg>
      </span>
      <span className="hidden sm:inline">{isDark ? 'Claro' : 'Oscuro'}</span>
    </button>
  )
}

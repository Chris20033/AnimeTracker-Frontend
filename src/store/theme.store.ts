import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

function getInitialTheme(): ThemeState['theme'] {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: ThemeState['theme']) {
  document.documentElement.dataset.theme = theme
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      toggleTheme: () => {
        const nextTheme = get().theme === 'dark' ? 'light' : 'dark'
        applyTheme(nextTheme)
        set({ theme: nextTheme })
      },
    }),
    {
      name: 'animetracker.theme.v1',
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme ?? getInitialTheme())
      },
    },
  ),
)

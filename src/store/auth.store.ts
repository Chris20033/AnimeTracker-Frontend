import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthSession } from '@/features/auth/types/auth.interface'

interface AuthState {
  session: AuthSession | null
  isAuthenticated: boolean
  setSession: (session: AuthSession) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      isAuthenticated: false,
      setSession: (session) => set({ session, isAuthenticated: true }),
      clearSession: () => set({ session: null, isAuthenticated: false }),
    }),
    {
      name: 'animetracker.auth.v1',
      partialize: (state) => ({ session: state.session, isAuthenticated: state.isAuthenticated }),
    },
  ),
)

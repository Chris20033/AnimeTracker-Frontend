import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './authContext'
import { loginRequest, logoutRequest, registerRequest } from '../services/authApi'
import type { AuthSession } from '../types'

const AUTH_STORAGE_KEY = 'animetracker.auth.v1'

function readStoredSession(): AuthSession | null {
  const rawSession = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!rawSession) {
    return null
  }

  try {
    const parsedSession = JSON.parse(rawSession) as AuthSession

    if (!parsedSession.accessToken || !parsedSession.user?.id) {
      return null
    }

    return parsedSession
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readStoredSession())

  useEffect(() => {
    if (session) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
      return
    }

    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [session])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session?.accessToken),
      login: async (payload) => {
        const nextSession = await loginRequest(payload)
        setSession(nextSession)
      },
      register: async (payload) => {
        const nextSession = await registerRequest(payload)
        setSession(nextSession)
      },
      logout: async () => {
        if (session?.accessToken) {
          await logoutRequest(session.accessToken)
        }

        setSession(null)
      },
    }),
    [session],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

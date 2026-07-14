import { loginService } from '@/features/auth/services/auth.service'
import type { AuthSession, LoginPayload } from '@/features/auth/types/auth.interface'

export function loginAction(payload: LoginPayload): Promise<AuthSession> {
  return loginService(payload)
}

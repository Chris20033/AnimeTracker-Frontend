import { loginService } from '@/services/auth.service'
import type { AuthSession, LoginPayload } from '@/interface/auth.interface'

export function loginAction(payload: LoginPayload): Promise<AuthSession> {
  return loginService(payload)
}

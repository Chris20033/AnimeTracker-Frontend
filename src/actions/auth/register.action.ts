import { registerService } from '@/services/auth.service'
import type { AuthSession, RegisterPayload } from '@/interface/auth.interface'

export function registerAction(payload: RegisterPayload): Promise<AuthSession> {
  return registerService(payload)
}

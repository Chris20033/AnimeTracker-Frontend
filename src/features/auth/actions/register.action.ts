import { registerService } from '@/features/auth/services/auth.service'
import type { AuthSession, RegisterPayload } from '@/features/auth/types/auth.interface'

export function registerAction(payload: RegisterPayload): Promise<AuthSession> {
  return registerService(payload)
}

import { forgotPasswordService } from '@/features/auth/services/auth.service'
import type { ForgotPasswordPayload } from '@/features/auth/types/auth.interface'

export function forgotPasswordAction(payload: ForgotPasswordPayload): Promise<string> {
  return forgotPasswordService(payload)
}

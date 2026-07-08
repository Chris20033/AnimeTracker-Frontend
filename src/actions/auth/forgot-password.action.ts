import { forgotPasswordService } from '@/services/auth.service'
import type { ForgotPasswordPayload } from '@/interface/auth.interface'

export function forgotPasswordAction(payload: ForgotPasswordPayload): Promise<string> {
  return forgotPasswordService(payload)
}

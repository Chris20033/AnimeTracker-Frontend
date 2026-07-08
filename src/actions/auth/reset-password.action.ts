import { resetPasswordService, validateResetTokenService } from '@/services/auth.service'
import type { ResetPasswordPayload } from '@/interface/auth.interface'

export function resetPasswordAction(payload: ResetPasswordPayload): Promise<string> {
  return resetPasswordService(payload)
}

export function validateResetTokenAction(token: string): Promise<boolean> {
  return validateResetTokenService(token)
}

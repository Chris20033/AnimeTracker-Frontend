import { resetPasswordService, validateResetTokenService } from '@/features/auth/services/auth.service'
import type { ResetPasswordPayload } from '@/features/auth/types/auth.interface'

export function resetPasswordAction(payload: ResetPasswordPayload): Promise<string> {
  return resetPasswordService(payload)
}

export function validateResetTokenAction(token: string): Promise<boolean> {
  return validateResetTokenService(token)
}

import { logoutService } from '@/features/auth/services/auth.service'

export function logoutAction(): Promise<void> {
  return logoutService()
}

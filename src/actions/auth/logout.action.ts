import { logoutService } from '@/services/auth.service'

export function logoutAction(): Promise<void> {
  return logoutService()
}

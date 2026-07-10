import { getMyProfileService } from '@/features/user/services/user.service'
import type { PrivateUserProfile } from '@/features/user/types/user.interface'

export function getMeAction(): Promise<PrivateUserProfile> {
  return getMyProfileService()
}

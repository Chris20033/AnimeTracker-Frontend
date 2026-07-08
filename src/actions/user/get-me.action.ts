import { getMyProfileService } from '@/services/user.service'
import type { PrivateUserProfile } from '@/interface/user.interface'

export function getMeAction(): Promise<PrivateUserProfile> {
  return getMyProfileService()
}

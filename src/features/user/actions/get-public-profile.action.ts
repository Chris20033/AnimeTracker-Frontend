import { getPublicProfileService } from '@/features/user/services/user.service'
import type { PublicUserProfile } from '@/features/user/types/user.interface'

export function getPublicProfileAction(username: string): Promise<PublicUserProfile> {
  return getPublicProfileService(username)
}

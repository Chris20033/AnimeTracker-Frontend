import { getPublicProfileService } from '@/services/user.service'
import type { PublicUserProfile } from '@/interface/user.interface'

export function getPublicProfileAction(username: string): Promise<PublicUserProfile> {
  return getPublicProfileService(username)
}

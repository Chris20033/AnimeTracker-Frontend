import { updateProfileService } from '@/features/user/services/user.service'
import type { UpdateUserProfileApiResponse, UpdateUserProfilePayload } from '@/features/user/types/user.interface'

export function updateProfileAction(payload: UpdateUserProfilePayload): Promise<UpdateUserProfileApiResponse['data']> {
  return updateProfileService(payload)
}

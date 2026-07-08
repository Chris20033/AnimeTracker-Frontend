import { updateProfileService } from '@/services/user.service'
import type { UpdateUserProfileApiResponse, UpdateUserProfilePayload } from '@/interface/user.interface'

export function updateProfileAction(payload: UpdateUserProfilePayload): Promise<UpdateUserProfileApiResponse['data']> {
  return updateProfileService(payload)
}

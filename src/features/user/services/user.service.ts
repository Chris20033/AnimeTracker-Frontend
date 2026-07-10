import { apiClient } from '@/shared/lib/apiClient'
import type {
  PrivateUserProfile,
  PrivateUserProfileApiResponse,
  PublicUserProfile,
  PublicUserProfileApiResponse,
  UpdateUserProfileApiResponse,
  UpdateUserProfilePayload,
} from '@/features/user/types/user.interface'

export async function getMyProfileService(): Promise<PrivateUserProfile> {
  const response = await apiClient.get<PrivateUserProfileApiResponse>('/users/me')
  return response.data.data
}

export async function updateProfileService(payload: UpdateUserProfilePayload): Promise<UpdateUserProfileApiResponse['data']> {
  const formData = new FormData()

  formData.append('username', payload.username)
  formData.append('bio', payload.bio ?? '')

  if (payload.avatar) {
    formData.append('avatar', payload.avatar)
  }

  if (payload.banner) {
    formData.append('banner', payload.banner)
  }

  const response = await apiClient.patch<UpdateUserProfileApiResponse>('/users/me', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.data
}

export async function getPublicProfileService(username: string): Promise<PublicUserProfile> {
  const response = await apiClient.get<PublicUserProfileApiResponse>(`/users/${encodeURIComponent(username)}`)
  return response.data.data
}

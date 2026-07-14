import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileAction } from '@/features/user/actions/update-profile.action'
import { myProfileQueryKey } from '@/features/user/hooks/useMyProfile'
import { useAuthStore } from '@/store/auth.store'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async (profile) => {
      const session = useAuthStore.getState().session

      if (session) {
        setSession({
          ...session,
          user: {
            ...session.user,
            username: profile.username,
            avatarUrl: profile.avatarUrl,
            bannerUrl: profile.bannerUrl,
            bio: profile.bio,
          },
        })
      }

      await queryClient.invalidateQueries({ queryKey: myProfileQueryKey })
      await queryClient.invalidateQueries({ queryKey: ['users', 'public', profile.username] })
    },
  })
}

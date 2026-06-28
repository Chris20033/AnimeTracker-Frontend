import { useMutation } from '@tanstack/react-query'
import { logoutAction } from '@/actions/auth/logout.action'
import { useAuthStore } from '@/store/auth.store'

export function useLogout() {
  const clearSession = useAuthStore((state) => state.clearSession)

  return useMutation({
    mutationFn: logoutAction,
    onSettled: clearSession,
  })
}

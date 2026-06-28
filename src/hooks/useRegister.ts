import { useMutation } from '@tanstack/react-query'
import { registerAction } from '@/actions/auth/register.action'
import { useAuthStore } from '@/store/auth.store'

export function useRegister() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: registerAction,
    onSuccess: setSession,
  })
}

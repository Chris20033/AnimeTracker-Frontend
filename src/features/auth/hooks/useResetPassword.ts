import { useMutation, useQuery } from '@tanstack/react-query'
import { resetPasswordAction, validateResetTokenAction } from '@/features/auth/actions/reset-password.action'

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPasswordAction,
  })
}

export function useResetTokenStatus(token: string) {
  return useQuery({
    queryKey: ['validate-reset-token', token],
    queryFn: () => validateResetTokenAction(token),
    enabled: !!token,
    retry: false,
  })
}

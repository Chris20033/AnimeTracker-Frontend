import { useMutation } from '@tanstack/react-query'
import { forgotPasswordAction } from '@/features/auth/actions/forgot-password.action'

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordAction,
  })
}

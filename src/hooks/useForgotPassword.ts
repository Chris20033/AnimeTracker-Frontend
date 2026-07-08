import { useMutation } from '@tanstack/react-query'
import { forgotPasswordAction } from '@/actions/auth/forgot-password.action'

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordAction,
  })
}

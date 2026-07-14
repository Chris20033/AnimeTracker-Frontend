import { apiClient } from '@/shared/lib/apiClient'
import type {
  AuthApiResponse,
  AuthSession,
  ForgotPasswordPayload,
  LoginPayload,
  MessageApiResponse,
  RegisterPayload,
  ResetPasswordPayload,
  ValidateResetTokenApiResponse,
} from '@/features/auth/types/auth.interface'

export async function loginService(payload: LoginPayload): Promise<AuthSession> {
  // Backend: POST /api/auth/login
  // Request: { email, password }
  // Response: { data: { user, accessToken } }
  const response = await apiClient.post<AuthApiResponse>('/auth/login', payload)
  return response.data.data
}

export async function registerService(payload: RegisterPayload): Promise<AuthSession> {
  // Backend: POST /api/auth/register
  // Request: { username, email, password }
  // Response: { data: { user, accessToken } }
  const response = await apiClient.post<AuthApiResponse>('/auth/register', payload)
  return response.data.data
}

export async function logoutService(): Promise<void> {
  // Backend: POST /api/auth/logout
  // Header is attached by api.service.ts when an accessToken exists.
  // Response: 204 No Content
  await apiClient.post('/auth/logout')
}

export async function forgotPasswordService(payload: ForgotPasswordPayload): Promise<string> {
  // Backend: POST /api/auth/forgot-password
  // Request: { email }
  // Response: { message }
  const response = await apiClient.post<MessageApiResponse>('/auth/forgot-password', payload)
  return response.data.message
}

export async function resetPasswordService(payload: ResetPasswordPayload): Promise<string> {
  // Backend: POST /api/auth/reset-password
  // Request: { token, newPassword }
  // Response: { message }
  const response = await apiClient.post<MessageApiResponse>('/auth/reset-password', payload)
  return response.data.message
}

export async function validateResetTokenService(token: string): Promise<boolean> {
  // Backend: POST /api/auth/validate-reset-token
  // Request: { token }
  // Response: { data: { valid: true } }
  const response = await apiClient.post<ValidateResetTokenApiResponse>('/auth/validate-reset-token', { token })
  return response.data.data.valid
}

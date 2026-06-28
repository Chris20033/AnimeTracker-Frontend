import { apiClient } from '@/services/api.service'
import type { AuthApiResponse, AuthSession, LoginPayload, RegisterPayload } from '@/interface/auth.interface'

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

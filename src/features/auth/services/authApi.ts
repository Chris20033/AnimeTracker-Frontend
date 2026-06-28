import { httpClient } from '../../../shared/api/httpClient'
import type { AuthApiResponse, AuthSession, LoginPayload, RegisterPayload } from '../types'

export async function loginRequest(payload: LoginPayload): Promise<AuthSession> {
  // Backend: POST /api/auth/login
  // Request: { email, password }
  // Response: { data: { user, accessToken } }
  const response = await httpClient.post<AuthApiResponse>('/auth/login', payload)
  return response.data.data
}

export async function registerRequest(payload: RegisterPayload): Promise<AuthSession> {
  // Backend: POST /api/auth/register
  // Request: { username, email, password }
  // Response: { data: { user, accessToken } }
  const response = await httpClient.post<AuthApiResponse>('/auth/register', payload)
  return response.data.data
}

export async function logoutRequest(accessToken: string): Promise<void> {
  // Backend: POST /api/auth/logout
  // Header: Authorization: Bearer <accessToken>
  // Response: 204 No Content
  await httpClient.post('/auth/logout', undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

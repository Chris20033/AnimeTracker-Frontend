export interface AuthUser {
  id: string
  username: string
  email: string
  role: 'USER' | 'ADMIN'
  avatarUrl: string | null
  bannerUrl: string | null
  bio: string | null
}

export interface AuthSession {
  user: AuthUser
  accessToken: string
}

export interface AuthApiResponse {
  data: AuthSession
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
}

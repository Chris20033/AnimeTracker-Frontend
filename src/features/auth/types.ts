export type AuthUser = {
  id: string
  username: string
  email: string
  role: 'USER' | 'ADMIN'
  avatarUrl: string | null
  bannerUrl: string | null
  bio: string | null
}

export type AuthSession = {
  user: AuthUser
  accessToken: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  username: string
  email: string
  password: string
}

export type AuthApiResponse = {
  data: AuthSession
}

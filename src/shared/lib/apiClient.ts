import axios from 'axios'
import { useAuthStore } from '@/store/auth.store'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: import.meta.env.VITE_USE_NGROK === 'true' ? { 'ngrok-skip-browser-warning': 'true' } : undefined,
})

apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().session?.accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

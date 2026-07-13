import { apiClient } from '@/shared/lib/apiClient'
import type { AddLibraryEntryPayload, LibraryApiResponse, LibraryEntry, LibraryEntryApiResponse, LibraryQueryParams, UpdateLibraryEntryPayload } from '@/features/library/types/library.interface'

export async function getLibraryService(params: LibraryQueryParams): Promise<LibraryApiResponse> {
  const response = await apiClient.get<LibraryApiResponse>('/library', { params })
  return response.data
}

export async function addLibraryEntryService(payload: AddLibraryEntryPayload): Promise<LibraryEntry> {
  const response = await apiClient.post<LibraryEntryApiResponse>('/library', payload)
  return response.data.data
}

export async function updateLibraryEntryService(id: string, payload: UpdateLibraryEntryPayload): Promise<LibraryEntry> {
  const response = await apiClient.patch<LibraryEntryApiResponse>(`/library/${id}`, payload)
  return response.data.data
}

export async function deleteLibraryEntryService(id: string): Promise<void> {
  await apiClient.delete(`/library/${id}`)
}

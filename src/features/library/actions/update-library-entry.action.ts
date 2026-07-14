import { updateLibraryEntryService } from '@/features/library/services/library.service'
import type { LibraryEntry, UpdateLibraryEntryPayload } from '@/features/library/types/library.interface'

export interface UpdateLibraryEntryActionPayload {
  id: string
  payload: UpdateLibraryEntryPayload
}

export function updateLibraryEntryAction({ id, payload }: UpdateLibraryEntryActionPayload): Promise<LibraryEntry> {
  return updateLibraryEntryService(id, payload)
}

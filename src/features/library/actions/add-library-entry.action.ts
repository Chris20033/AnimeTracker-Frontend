import { addLibraryEntryService } from '@/features/library/services/library.service'
import type { AddLibraryEntryPayload, LibraryEntry } from '@/features/library/types/library.interface'

export function addLibraryEntryAction(payload: AddLibraryEntryPayload): Promise<LibraryEntry> {
  return addLibraryEntryService(payload)
}

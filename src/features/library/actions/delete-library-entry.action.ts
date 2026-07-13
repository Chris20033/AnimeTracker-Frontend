import { deleteLibraryEntryService } from '@/features/library/services/library.service'

export function deleteLibraryEntryAction(id: string): Promise<void> {
  return deleteLibraryEntryService(id)
}

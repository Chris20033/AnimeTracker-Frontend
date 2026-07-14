import { getLibraryService } from '@/features/library/services/library.service'
import type { LibraryApiResponse, LibraryQueryParams } from '@/features/library/types/library.interface'

export function getLibraryAction(params: LibraryQueryParams): Promise<LibraryApiResponse> {
  return getLibraryService(params)
}

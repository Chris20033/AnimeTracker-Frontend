export interface ProfileFormErrors {
  username?: string
  avatar?: string
  banner?: string
  bio?: string
  form?: string
}

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxImageSize = 5 * 1024 * 1024

function validateImageFile(file: File | undefined, label: string) {
  if (!file) {
    return undefined
  }

  if (!allowedImageTypes.includes(file.type)) {
    return `${label} must be JPG, PNG, or WebP.`
  }

  if (file.size > maxImageSize) {
    return `${label} cannot exceed 5 MB.`
  }

  return undefined
}

export function validateProfileForm(username: string, bio: string, avatar: File | undefined, banner: File | undefined): ProfileFormErrors {
  const errors: ProfileFormErrors = {}

  if (!username.trim()) {
    errors.username = 'Username is required.'
  }

  if (username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters.'
  }

  const avatarError = validateImageFile(avatar, 'Avatar')
  const bannerError = validateImageFile(banner, 'Banner')

  if (avatarError) {
    errors.avatar = avatarError
  }

  if (bannerError) {
    errors.banner = bannerError
  }

  if (bio.length > 500) {
    errors.bio = 'Bio cannot exceed 500 characters.'
  }

  return errors
}

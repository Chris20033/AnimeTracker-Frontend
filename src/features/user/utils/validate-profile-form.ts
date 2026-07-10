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
    return `${label} debe ser JPG, PNG o WebP.`
  }

  if (file.size > maxImageSize) {
    return `${label} no puede superar 5 MB.`
  }

  return undefined
}

export function validateProfileForm(username: string, bio: string, avatar: File | undefined, banner: File | undefined): ProfileFormErrors {
  const errors: ProfileFormErrors = {}

  if (!username.trim()) {
    errors.username = 'El username es obligatorio.'
  }

  if (username.trim().length < 3) {
    errors.username = 'El username debe tener al menos 3 caracteres.'
  }

  const avatarError = validateImageFile(avatar, 'El avatar')
  const bannerError = validateImageFile(banner, 'El banner')

  if (avatarError) {
    errors.avatar = avatarError
  }

  if (bannerError) {
    errors.banner = bannerError
  }

  if (bio.length > 500) {
    errors.bio = 'La biografia no puede superar 500 caracteres.'
  }

  return errors
}

import { isAxiosError } from 'axios'
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { SubmitButton } from '@/features/auth/components/SubmitButton'
import { TextField } from '@/features/auth/components/TextField'
import { useUpdateProfile } from '@/features/user/hooks/useUpdateProfile'
import type { PrivateUserProfile } from '@/features/user/types/user.interface'
import { validateProfileForm, type ProfileFormErrors } from '@/features/user/utils/validate-profile-form'

interface ProfileEditFormProps {
  profile: PrivateUserProfile
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const updateProfileMutation = useUpdateProfile()
  const [username, setUsername] = useState(profile.username)
  const [bio, setBio] = useState(profile.bio ?? '')
  const [avatar, setAvatar] = useState<File>()
  const [banner, setBanner] = useState<File>()
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl ?? '')
  const [bannerPreview, setBannerPreview] = useState(profile.bannerUrl ?? '')
  const [errors, setErrors] = useState<ProfileFormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    setUsername(profile.username)
    setBio(profile.bio ?? '')
    setAvatar(undefined)
    setBanner(undefined)
    setAvatarPreview(profile.avatarUrl ?? '')
    setBannerPreview(profile.bannerUrl ?? '')
  }, [profile])

  function handleImageChange(event: ChangeEvent<HTMLInputElement>, kind: 'avatar' | 'banner') {
    const file = event.target.files?.[0]

    if (kind === 'avatar') {
      setAvatar(file)
      setAvatarPreview(file ? URL.createObjectURL(file) : profile.avatarUrl ?? '')
      return
    }

    setBanner(file)
    setBannerPreview(file ? URL.createObjectURL(file) : profile.bannerUrl ?? '')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateProfileForm(username, bio, avatar, banner)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccessMessage('')
      return
    }

    setErrors({})
    setSuccessMessage('')

    try {
      await updateProfileMutation.mutateAsync({
        username: username.trim(),
        bio: bio.trim() || null,
        avatar,
        banner,
      })
      setSuccessMessage('Profile updated successfully.')
    } catch (error) {
      setErrors({ form: isAxiosError(error) ? 'That username is already in use or the data is invalid.' : "We couldn't update the profile." })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel p-5 sm:p-7">
      <div className="mb-6 border-b border-[var(--line)] pb-5">
        <p className="ledger-kicker">Private edit</p>
        <h2 className="mt-2 text-2xl ledger-title">Adjust identity</h2>
        <p className="mt-2 text-sm font-semibold text-[var(--muted)]">This data powers your public profile and private session.</p>
      </div>

      <div className="grid gap-5">
        <TextField label="Username" name="username" autoComplete="username" value={username} error={errors.username} onChange={(event) => setUsername(event.target.value)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageField label="Avatar" name="avatar" previewUrl={avatarPreview} error={errors.avatar} onChange={(event) => handleImageChange(event, 'avatar')} />
          <ImageField label="Banner" name="banner" previewUrl={bannerPreview} error={errors.banner} onChange={(event) => handleImageChange(event, 'banner')} />
        </div>

        <div className="block">
          <label htmlFor="bio" className="text-sm font-black text-[var(--page-fg)]">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={5}
            maxLength={500}
            value={bio}
            aria-invalid={Boolean(errors.bio)}
            aria-describedby={errors.bio ? 'bio-error' : 'bio-help'}
            onChange={(event) => setBio(event.target.value)}
            className="mt-2 w-full resize-none rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-4 py-3 text-[var(--page-fg)] outline-none transition placeholder:text-[var(--soft)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--focus)]"
          />
          <div className="mt-2 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--soft)]">
            {errors.bio ? <span id="bio-error" className="text-[var(--danger)]">{errors.bio}</span> : <span id="bio-help">Maximum 500 characters.</span>}
            <span>{bio.length}/500</span>
          </div>
        </div>

        {errors.form ? <p role="alert" className="state-error px-4 py-3 text-sm font-semibold">{errors.form}</p> : null}
        {successMessage ? <p role="status" className="state-success px-4 py-3 text-sm font-semibold">{successMessage}</p> : null}

        <SubmitButton isLoading={updateProfileMutation.isPending} loadingLabel="Saving profile...">
          Save profile
        </SubmitButton>
      </div>
    </form>
  )
}

interface ImageFieldProps {
  label: string
  name: string
  previewUrl: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function ImageField({ label, name, previewUrl, error, onChange }: ImageFieldProps) {
  const errorId = error ? `${name}-error` : undefined

  return (
    <div className="block">
      <label htmlFor={name} className="text-sm font-black text-[var(--page-fg)]">
        {label}
      </label>
      <div className="mt-2 overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)]">
        <div className="grid h-28 place-items-center bg-[var(--surface)] text-sm font-black text-[var(--soft)]">
          {previewUrl ? <img src={previewUrl} alt={`${label.toLowerCase()} preview`} className="size-full object-cover" /> : 'No image'}
        </div>
        <input
          id={name}
          name={name}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          onChange={onChange}
          className="block w-full cursor-pointer px-3 py-3 text-sm font-semibold text-[var(--muted)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--accent)] file:px-4 file:py-2 file:font-black file:text-[var(--action-ink)] hover:file:brightness-105 focus:outline-none focus:ring-4 focus:ring-[var(--focus)]"
        />
      </div>
      {error ? <span id={errorId} className="mt-2 block text-sm font-semibold text-[var(--danger)]">{error}</span> : null}
      <p className="mt-2 text-xs font-bold text-[var(--soft)]">JPG, PNG, or WebP. Maximum 5 MB.</p>
    </div>
  )
}

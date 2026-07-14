import { expect, test } from '@playwright/test'

test('complete user flow: login, search, library and favorites', async ({ page }) => {
  const runId = Date.now()
  const username = `e2e_user_${runId}`
  const email = `e2e_${runId}@example.com`
  const password = 'Password123'
  const animeTitle = 'Attack on Titan'

  await page.goto('/registro')

  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Correo').fill(email)
  await page.getByLabel('Contraseña').fill(password)
  await page.getByRole('button', { name: 'Crear cuenta' }).click()

  await expect(page).toHaveURL(/\/dashboard/)
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()

  await page.goto('/anime')
  const catalogSearch = page.locator('main form[role="search"]')
  await catalogSearch.getByLabel('Buscar anime').fill(animeTitle)
  await catalogSearch.getByRole('button', { name: 'Aplicar filtros' }).click()

  await expect(page.getByRole('heading', { name: `Resultados para ${animeTitle}` })).toBeVisible()
  await page.getByRole('link', { name: new RegExp(animeTitle, 'i') }).first().click()

  await expect(page).toHaveURL(/\/anime\/KITSU\/\d+/)
  await expect(page.locator('h1').filter({ hasText: animeTitle })).toBeVisible()

  await page.getByRole('button', { name: /Agregar a biblioteca/ }).click()
  await expect(page.getByRole('status')).toContainText('Anime agregado a tu biblioteca.')

  await page.getByRole('button', { name: new RegExp(`Marcar ${animeTitle} como favorito`, 'i') }).click()
  await expect(page.getByRole('button', { name: new RegExp(`Quitar ${animeTitle} de favoritos`, 'i') })).toBeVisible()

  await page.goto('/library')
  await expect(page.getByText(animeTitle).first()).toBeVisible()

  await page.goto(`/u/${username}`)
  await expect(page.getByRole('heading', { name: username })).toBeVisible()
  await expect(page.getByText(animeTitle).first()).toBeVisible()
})

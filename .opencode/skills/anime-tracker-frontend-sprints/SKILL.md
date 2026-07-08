---
name: anime-tracker-frontend-sprints
description: Use when implementing AnimeTracker frontend sprint tasks from the roadmap, especially Plan de Sprints.md frontend checkboxes, verification, and documentation alignment.
---

# AnimeTracker Frontend Sprints

Use this skill before implementing frontend sprint work for AnimeTracker.

## Sources Of Truth

- Roadmap: `E:\Escritorio\Proyecto\AnimeTracker\Docs\AnimeTracker\06 Roadmap\Plan de Sprints.md`
- API docs: `E:\Escritorio\Proyecto\AnimeTracker\Docs\AnimeTracker\08 API`
- Frontend architecture: `AGENTS.md`

## Workflow

- Read the relevant sprint section before implementing.
- Read the related API endpoint documentation before creating services or payloads.
- Assume backend endpoints exist when documented and marked complete in the roadmap.
- Keep API contracts in `src/interface/`.
- Keep HTTP calls in `src/services/` through `api.service.ts`.
- Use actions as thin wrappers around services.
- Use TanStack Query hooks for API mutations/queries.
- Use Zustand only for global client state such as session or theme.
- Use `@/...` imports for source files.

## Roadmap Checkboxes

- Mark frontend roadmap checkboxes only after implementation and verification pass.
- Do not mark backend, testing, documentation, or unrelated checkboxes unless that work was actually completed.
- Do not mark roadmap checkboxes for internal refactors unless the checkbox directly describes that work.

## Verification

- Run `npm run lint` after code changes.
- Run `npm run build` before closing the sprint task.
- If verification fails, fix the issue before reporting completion.

## Sprint 3 Notes

- `POST /api/auth/forgot-password` expects `{ email }` and returns a public success message without revealing whether the email exists.
- `POST /api/auth/reset-password` expects `{ token, newPassword }`.
- Backend development email links target `/reset-password?token=...`.
- Sprint 3 frontend includes forgot password page, reset password page, clear success/error messages, new password validation, and a light/dark mode button.

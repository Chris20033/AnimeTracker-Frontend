# AnimeTracker Frontend Guidelines

## Scope

- Work only in the frontend unless the user explicitly asks for backend changes.
- Backend endpoints are assumed to exist when they are documented in the roadmap/API docs.
- Keep implementation aligned with `E:\Escritorio\Proyecto\AnimeTracker\Docs\AnimeTracker\06 Roadmap\Plan de Sprints.md`.

## Architecture

- Use React, TypeScript, Vite, Tailwind CSS, React Router, Axios, TanStack Query and Zustand.
- Use Axios for HTTP through `src/shared/lib/apiClient.ts`.
- `src/shared/lib/apiClient.ts` must always read `baseURL` from `import.meta.env.VITE_API_URL`; do not add fallback URLs or hardcoded local API defaults.
- Use TanStack Query for server mutations/queries.
- Use Zustand for global client state such as session or theme.
- Prefer imports with `@/...` for source files.
- Keep files small and focused; split components when a file grows beyond a clear single responsibility.
- Do not add backward-compatibility code unless there is a concrete persisted data or external API need.

## TypeScript

- Prefer `interface` over `type` for props, models, payloads and errors.
- Keep API contracts in feature-local `types/` folders.
- Keep form validation helpers near their feature in `utils/` folders.
- Avoid `any` unless there is no reasonable typed alternative.

## UI/UX

- Maintain a simple, modern anime-inspired visual direction without excessive saturation.
- Support both light and dark mode for page-level changes.
- Use CSS variables from `src/index.css` instead of scattering raw colors.
- Keep focus states visible and keyboard accessible.
- Inputs must have labels; icon-only buttons must have `aria-label`.
- Responsive behavior should work at mobile, tablet and desktop widths.
- Use the local UI skills when doing frontend visual work: `frontend-design`, `frontend-ui-ux`, `impeccable`, `baseline-ui`, `make-interfaces-feel-better`, `emil-design-eng`, and `ui-ux-pro-max`.

## Project Structure

- `src/app/`: app shell, layouts, router and app-level wiring.
- `src/features/`: feature-local pages, components, hooks, actions, services, types and utils.
- `src/shared/`: reusable cross-feature UI, pages and infrastructure.
- `src/store/`: Zustand stores.
- `src/styles/`: global styles and design tokens.
- `src/store/`: Zustand stores.
- `src/utils/`: validation and small pure helpers.

## Roadmap Workflow

- Before starting a sprint task, read the relevant section of the roadmap.
- For sprint work, load the local `anime-tracker-frontend-sprints` skill.
- Mark roadmap checkboxes only after implementation and verification pass.
- Do not mark roadmap checkboxes for internal refactors unless the checkbox directly describes that work.

## Verification

- Run `npm run lint` after code changes.
- Run `npm run build` before considering a sprint/frontend task complete.
- If verification fails, fix the issue before reporting completion.

# AnimeTracker Frontend Guidelines

## Scope

- Work only in the frontend unless the user explicitly asks for backend changes.
- Backend endpoints are assumed to exist when they are documented in the roadmap/API docs.
- Keep implementation aligned with `E:\Escritorio\Proyecto\AnimeTracker\Docs\AnimeTracker\06 Roadmap\Plan de Sprints.md`.

## Architecture

- Use React, TypeScript, Vite, Tailwind CSS, React Router, Axios, TanStack Query and Zustand.
- Use Axios for HTTP through `src/services/api.service.ts`.
- `src/services/api.service.ts` must always read `baseURL` from `import.meta.env.VITE_API_URL`; do not add fallback URLs or hardcoded local API defaults.
- Use TanStack Query for server mutations/queries.
- Use Zustand for global client state such as session or theme.
- Prefer imports with `@/...` for source files.
- Keep files small and focused; split components when a file grows beyond a clear single responsibility.
- Do not add backward-compatibility code unless there is a concrete persisted data or external API need.

## TypeScript

- Prefer `interface` over `type` for props, models, payloads and errors.
- Keep API contracts in `src/interface/`.
- Keep form validation helpers in `src/utils/`.
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

- `src/actions/`: thin wrappers around services for mutations.
- `src/components/`: reusable UI and domain components.
- `src/config/`: app-level configuration such as query client.
- `src/hooks/`: TanStack Query hooks and reusable React hooks.
- `src/interface/`: shared TypeScript interfaces.
- `src/layouts/`: layout and navigation components.
- `src/pages/`: route-level pages.
- `src/routes/`: router and route guards.
- `src/services/`: API clients and endpoint services.
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

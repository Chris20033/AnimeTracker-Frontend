---
name: frontend-ui-ux
description: Use when building or modifying user-facing frontend interfaces that need production-quality UX, accessibility, responsive layout, component architecture, and non-AI visual polish.
---

# Frontend UI UX

Use this skill for user-facing UI changes, forms, navigation, responsive behavior, accessibility, and interaction states.

## Requirements

- Every modified page must work in light and dark mode.
- Every input needs a visible label or accessible name.
- Icon-only buttons need `aria-label`.
- Focus states must be visible and keyboard accessible.
- Loading, error, empty, and success states must be explicit.
- Responsive layouts must work at 320px, 768px, 1024px, and desktop widths.
- Do not rely only on color to communicate state.

## Component Guidance

- Prefer small focused components.
- Use local state for local interactions, TanStack Query for server state, and Zustand for global client state.
- Keep data fetching and presentation separated when complexity grows.
- Prefer `interface` for props and API contracts.

## Verification

- Run lint and build after implementation.
- Check tab order mentally for forms and nav.
- Check contrast in both themes.

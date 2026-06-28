---
name: anime-tracker-frontend-sprints
description: Use when working on AnimeTracker frontend sprint tasks, especially Plan de Sprints.md, Sprint 1, roadmap checkboxes, React, Vite, routes, components, styles, or frontend quality. Focuses only on frontend documentation in Docs/AnimeTracker/06 Roadmap and updates completed checkboxes.
---

# AnimeTracker Frontend Sprint Tracker

Use this skill whenever the task touches AnimeTracker frontend sprint work, React/Vite code, routing, reusable UI components, global styles, frontend quality checks, or the roadmap checklist.

## Documentation Scope

The sprint documentation source of truth for frontend work is:

`E:\Escritorio\Proyecto\AnimeTracker\Docs\AnimeTracker\06 Roadmap`

Primary file:

`E:\Escritorio\Proyecto\AnimeTracker\Docs\AnimeTracker\06 Roadmap\Plan de Sprints.md`

Do not use `E:\Escritorio\Proyecto\AnimeTracker\Docs\06 Roadmap`; that path was checked and does not exist.

## Required Workflow

Before implementing frontend sprint work:

1. Read `Plan de Sprints.md`.
2. Identify the active sprint section requested by the user.
3. Work only on frontend-related items unless the user explicitly expands scope.
4. Read other docs only when they are needed to avoid contradicting product behavior.

During implementation:

1. Keep changes focused on the current frontend sprint.
2. Prefer small, correct changes over broad rewrites.
3. Do not implement backend, database, API, DevOps, or documentation-only tasks unless they directly support frontend completion or the user asks for them.
4. Preserve the existing frontend stack and visual language unless the user asks for a redesign.

After implementation:

1. Run the relevant frontend verification command available in the project, such as lint, typecheck, or build.
2. Mark completed frontend checkboxes in `Plan de Sprints.md` by changing `- [ ]` to `- [x]` only after the work is implemented and verified.
3. Do not mark backend, database, or unrelated checkboxes.
4. Mention which roadmap checkboxes were updated in the final response.

## Sprint 1 Frontend Focus

When the user says to start Sprint 1, focus on the `Sprint 1 - Base Backend y Base de Datos` section, but only its frontend and frontend-applicable quality items.

Frontend items:

- Definir estructura de carpetas frontend.
- Crear configuracion base de rutas.
- Crear componentes base reutilizables.
- Crear estilos globales.

Frontend-applicable quality item:

- Ejecutar lint, if a frontend lint command exists.

Do not mark Sprint 1 backend, database, migration, Prisma, PostgreSQL, or schema documentation items from this frontend project unless the user explicitly asks.

## Checkbox Rules

Only mark a checkbox as complete when all of these are true:

1. The corresponding frontend implementation exists in the codebase.
2. The implementation matches the intent of the sprint item.
3. A relevant verification command was run, or the final response clearly says why verification could not be run.

If a task is partially complete, leave the checkbox unchecked and explain what remains.

## Final Response Requirements

When finishing a frontend sprint task, include:

- Code changed.
- Documentation changed, including checkbox updates in `Plan de Sprints.md`.
- Verification run.
- Any unchecked sprint items that remain.

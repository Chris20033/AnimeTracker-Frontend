# AnimeTracker Frontend

AnimeTracker es una aplicacion web para descubrir anime, organizar una biblioteca personal, marcar favoritos y visualizar estadisticas de progreso. Este repositorio contiene el frontend construido con React, TypeScript, Vite y Tailwind CSS.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=fff)
![Vitest](https://img.shields.io/badge/Vitest-tested-6E9F18?logo=vitest&logoColor=fff)

## Demo

- Demo publica: https://anime-tracker-lime.vercel.app/
- API/backend: https://animetracker-backend-ox7l.onrender.com/api
- Documentacion Swagger: https://animetracker-backend-ox7l.onrender.com/api/docs
- Repositorio backend: https://github.com/Chris20033/AnimeTracker-Backend
- Repositorio documentacion: https://github.com/Chris20033/AnimeTracker-Docs

## Descripcion

AnimeTracker esta pensado como un producto de seguimiento personal de anime. Permite buscar series, revisar detalles, guardar entradas en una biblioteca propia, marcar favoritos y consultar metricas utiles sobre el progreso del usuario.

El frontend esta organizado por features, consume una API REST mediante Axios y gestiona datos remotos con TanStack Query. La sesion y preferencias globales se manejan con Zustand.

## Funcionalidades

- Registro, inicio de sesion y cierre de sesion.
- Recuperacion y restablecimiento de contrasena.
- Rutas publicas y privadas.
- Perfil privado editable.
- Perfil publico por username.
- Busqueda, catalogo y detalle de anime.
- Biblioteca personal con estados de seguimiento.
- Favoritos de anime.
- Dashboard y estadisticas de actividad.
- Soporte light/dark mode.
- Estados de carga, error, vacio y exito.
- Interfaz responsive para mobile, tablet y desktop.
- Accesibilidad base con labels, foco visible y estados semanticos.

## Stack Tecnico

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Axios
- TanStack Query
- Zustand
- Vitest
- React Testing Library
- Playwright
- Oxlint

## Arquitectura Frontend

```txt
src/
  app/          # Router, layouts y configuracion de aplicacion
  features/     # Modulos de negocio por dominio
  shared/       # UI reutilizable, cliente HTTP y utilidades compartidas
  store/        # Estado global con Zustand
  styles/       # Estilos globales y tokens visuales
  test/         # Setup y utilidades globales de testing
```

Cada feature agrupa sus propias paginas, componentes, hooks, servicios, acciones, tipos, utilidades y tests cuando aplica.

## Variables de Entorno

Crea un archivo `.env` a partir de `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
```

Para produccion, `VITE_API_URL` debe apuntar a la URL publica del backend, por ejemplo:

```env
VITE_API_URL=https://animetracker-backend-ox7l.onrender.com/api
```

## Instalacion Local

Instala dependencias:

```bash
npm install
```

Crea el archivo de entorno:

```bash
cp .env.example .env
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicacion quedara disponible normalmente en `http://localhost:5173`.

## Scripts Disponibles

```bash
npm run dev       # Ejecuta Vite en modo desarrollo
npm run build     # Compila TypeScript y genera build de produccion
npm run preview   # Sirve localmente el build generado
npm run lint      # Ejecuta Oxlint
npm run test      # Ejecuta tests unitarios/de componentes con Vitest
npm run test:e2e  # Ejecuta tests end-to-end con Playwright
```

## Testing y Calidad

El proyecto incluye una suite minima de pruebas automatizadas para cubrir flujos y componentes principales del frontend.

- Tests unitarios y de componentes con Vitest + React Testing Library.
- Tests end-to-end preparados con Playwright.
- Linting con Oxlint.
- Build de produccion validado con TypeScript y Vite.

Comandos recomendados antes de abrir un pull request:

```bash
npm run lint
npm run test
npm run build
```

## Deploy

El frontend esta desplegado en Vercel y consume el backend desplegado en Render.

URLs de produccion:

- Frontend: https://anime-tracker-lime.vercel.app/
- Backend API: https://animetracker-backend-ox7l.onrender.com/api
- Swagger: https://animetracker-backend-ox7l.onrender.com/api/docs

Para desplegar el frontend en otro entorno, configura `VITE_API_URL` con la URL publica del backend antes de generar el build.

## Capturas

Pendiente agregar capturas del producto final.

Sugerencia de secciones para capturas:

- Home
- Catalogo de anime
- Detalle de anime
- Biblioteca personal
- Dashboard de estadisticas
- Perfil publico
- Vista mobile

## Estado del Proyecto

MVP frontend completado, desplegado en Vercel e integrado con backend desplegado en Render.

- UI principal implementada.
- Integracion con API preparada mediante `VITE_API_URL`.
- Suite minima de tests configurada.
- Build de produccion funcional.
- Deploy publico disponible.

## Proximos Pasos

- Configurar CI/CD con GitHub Actions.
- Agregar screenshots finales.
- Revisar performance y accesibilidad con Lighthouse.
- Monitorear errores y comportamiento en produccion.

## Autor

Desarrollado por Christian Ivan Escamilla Marquez como proyecto full stack de portafolio.

- GitHub: https://github.com/Chris20033
- LinkedIn: https://www.linkedin.com/in/christian-escamilla-marquez/

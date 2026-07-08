---
name: AnimeTracker
description: A premium anime streaming/catalog product system for tracking seasons, progress, favorites, and personal library state.
colors:
  page-bg-light: "#f5f3ef"
  page-fg-light: "#151515"
  surface-light: "#ffffffe6"
  surface-strong-light: "#f8f7f4fa"
  surface-inset-light: "#d5d0c76b"
  line-light: "#d5d0c7db"
  muted-light: "#4a4a4a"
  soft-light: "#747474"
  accent-light: "#b3121c"
  accent-strong-light: "#7f0d14"
  accent-soft-light: "#b3121c1f"
  sakura-light: "#b3121c"
  aura-light: "#7f0d14"
  cyan-light: "#2563eb"
  danger-light: "#b91c1c"
  action-ink-light: "#ffffff"
  nav-active-bg-light: "#151515"
  nav-active-fg-light: "#f5f3ef"
  badge-bg-light: "#151515"
  badge-fg-light: "#ffffff"
  page-bg-dark: "#0b0b0f"
  page-fg-dark: "#f4f4f5"
  surface-dark: "#17171de6"
  surface-strong-dark: "#202028f5"
  surface-inset-dark: "#2a2a33b8"
  line-dark: "#34343dd1"
  muted-dark: "#b8b8c0"
  soft-dark: "#7e7e89"
  accent-dark: "#e11d2e"
  accent-strong-dark: "#ff7a84"
  accent-soft-dark: "#e11d2e29"
  sakura-dark: "#e11d2e"
  aura-dark: "#8f0d17"
  cyan-dark: "#3b82f6"
  danger-dark: "#fecaca"
  action-ink-dark: "#ffffff"
  nav-active-bg-dark: "#f4f4f5"
  nav-active-fg-dark: "#0b0b0f"
  badge-bg-dark: "#f4f4f5"
  badge-fg-dark: "#0b0b0f"
  broadcast-bg-light: "#f5f3ef"
  broadcast-panel-light: "#ffffff"
  broadcast-ink-light: "#151515"
  broadcast-muted-light: "#4a4a4a"
  broadcast-sakura-light: "#b3121c"
  broadcast-violet-light: "#7f0d14"
  broadcast-highlight-light: "#b3121c"
  broadcast-action-ink: "#ffffff"
  broadcast-episode-ink: "#ffffff"
  broadcast-poster-text: "#f4f4f5"
  broadcast-bg-dark: "#0b0b0f"
  broadcast-panel-dark: "#17171d"
  broadcast-ink-dark: "#f4f4f5"
  broadcast-muted-dark: "#b8b8c0"
  broadcast-sakura-dark: "#e11d2e"
  broadcast-violet-dark: "#8f0d17"
  broadcast-highlight-dark: "#e11d2e"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "3rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.75
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 900
    lineHeight: 1.2
rounded:
  pill: "9999px"
  control: "1rem"
  card: "1.4rem"
  panel: "2rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.action-ink-light}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.25rem"
    height: "3rem"
  input-field:
    backgroundColor: "{colors.surface-inset-light}"
    textColor: "{colors.page-fg-light}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1rem"
  nav-link-active:
    backgroundColor: "{colors.page-fg-light}"
    textColor: "{colors.page-bg-light}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  card-surface:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.page-fg-light}"
    rounded: "{rounded.card}"
    padding: "1rem"
---

# Design System: AnimeTracker

## 1. Overview

**Creative North Star: "Anime Broadcast Board"**

AnimeTracker is a product UI first: it should help viewers resume anime tracking, recover access, and move through future library workflows without friction. The visual system uses a premium anime streaming/catalog palette: deep near-black dark mode, warm off-white light mode, strong red identity, and high-contrast surfaces.

The system should feel refined and secure. Auth, password recovery, dashboard, and future library screens must present clear next actions, explicit states, and readable hierarchy in both light and dark mode. It rejects generic SaaS dashboards, excessive neon/cyberpunk styling, low-contrast gray text, decorative gradient text, default glassmorphism, repeated identical card grids, and AI-looking section scaffolds.

**Key Characteristics:**

- Product-first broadcast-board clarity with restrained anime character.
- Poster-like feature panels, episode strips, and season rails instead of generic card grids.
- Heavy, confident sans typography for headings and labels.
- Rounded controls and panels that feel approachable but not playful.
- Accent color used for action, state, and orientation, not decoration.

## 2. Colors

The palette is inspired by premium anime streaming/catalog interfaces: near-black dark mode with layered charcoal surfaces, warm off-white light mode, red identity/action accents, and high-contrast text.

### Primary

- **Tracker Red Light** (`#b3121c`): Primary action, selected calls to action, and AnimeTracker identity in light mode.
- **Tracker Red Dark** (`#e11d2e`): Dark-mode primary action and streaming identity emphasis.
- **Deep Tracker Red Text Light** (`#7f0d14`): Strong accent text on light surfaces.
- **Neon Red Text Dark** (`#ff7a84`): Strong accent text on dark surfaces without introducing yellow drift.

### Secondary

- **Tracker Red Light** (`#b3121c`): AnimeTracker identity, badges, focus energy, and brand details.
- **Tracker Red Dark** (`#e11d2e`): Dark-mode streaming identity accent with readable saturation.

### Tertiary

- **Info Blue Light** (`#2563eb`): Supporting platform tone for metadata, progress, and informational states.
- **Info Blue Dark** (`#3b82f6`): Dark-mode tertiary accent for non-primary information.

### Neutral

- **Warm Catalog Field** (`#f5f3ef`): Light-mode page background.
- **Ink Text** (`#151515`): Light-mode primary text.
- **Warm Surface** (`#fffcf7d1`): Light-mode cards and panels.
- **Strong Paper Surface** (`#fffdf9f5`): Light-mode elevated panels and forms.
- **Charcoal Field** (`#11100f`): Dark-mode page background.
- **Warm Ink Text** (`#f8f1e9`): Dark-mode primary text.
- **Charcoal Surface** (`#1f1c19c7`): Dark-mode cards and nav surfaces.
- **Strong Charcoal Surface** (`#25211ef0`): Dark-mode forms and primary panels.
- **Muted Copy Light** (`#6f6258`) and **Muted Copy Dark** (`#d2c5b8`): Secondary text that still needs to remain readable.

### Named Rules

**The Accent Scarcity Rule.** Red and blue should guide action, streaming status, and anime identity, not flood the interface. Amber/yellow is reserved for future warning states only and should not appear in primary UI chrome.

**The No Washed Gray Rule.** Muted text must remain readable against its actual surface. Do not place generic gray text over tinted backgrounds.

**The Broadcast Specificity Rule.** Public-facing product screens should use anime-specific composition patterns such as featured airing frames, episode queue strips, and season shelves. Avoid returning to plain hero-card plus side-card scaffolds for the Home screen.

## 3. Typography

**Display Font:** Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
**Body Font:** Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
**Label/Mono Font:** Same family; no separate mono or decorative display font is currently used.

**Character:** The type system is heavy, compact, and product-oriented. It uses weight and tracking to create editorial confidence without introducing a second decorative typeface.

### Hierarchy

- **Display** (900, `3rem` to `4.5rem` in current pages, tight line-height): Used for route-level hero headings only. Keep display letter spacing at `-0.04em` or looser; avoid tighter tracking.
- **Headline** (900, around `2.25rem`, `1.08` line-height): Used for panel-level titles and important empty/error states.
- **Title** (900, around `1.5rem`, `1.2` line-height): Used in forms, cards, and section headings.
- **Body** (500, `1rem`, `1.75` line-height): Used for explanatory copy. Cap prose at 65-75 characters when possible.
- **Label** (900, `0.875rem` or `0.75rem`, sometimes uppercase with tracking): Used for form labels, nav items, and short metadata. Avoid placing a tracked uppercase kicker above every section.

### Named Rules

**The One-Family Product Rule.** Keep Inter/system sans as the only type family unless a future brand decision explicitly introduces a contrasting display face.

**The Display Restraint Rule.** Route-level headings can be bold, but product screens should not shout. Avoid heading max sizes above `4.5rem` in this app.

## 4. Elevation

AnimeTracker should be more flat than lifted. Depth comes primarily from tonal layering, borders, and state changes. Shadows exist, but they should be ambient and restrained, not glossy or glass-heavy.

### Shadow Vocabulary

- **Ambient Panel** (`0 30px 80px var(--shadow)`): Large route panels and form containers. Use only on major surfaces.
- **Ambient Nav** (`0 18px 50px var(--shadow)`): Header navigation and compact shell surfaces.
- **Ambient Brand** (`0 18px 45px var(--shadow)`): Brand tile and compact high-emphasis elements.
- **Action Shadow** (`0 18px 40px var(--shadow)`): Primary buttons and accepted action controls.

### Named Rules

**The Flat-First Rule.** A surface should read clearly with background and border before it needs shadow. If removing the shadow makes hierarchy collapse, strengthen the tonal layer first.

## 5. Components

Components should feel refined and secure: obvious affordances, predictable states, visible focus, and restrained anime identity.

### Buttons

- **Shape:** Rounded rectangle (`1rem`) or pill (`9999px`) depending on context.
- **Primary:** `var(--accent)` background, `var(--action-ink)` text, `px-5 py-3`, `min-height: 3rem`, heavy label.
- **Hover / Focus:** Slight lift (`translateY(-0.125rem)`), subtle brightness, and `focus:ring-4 focus:ring-[var(--focus)]`.
- **Disabled:** Surface inset background, soft text, no lift, no brightness change.

### Chips

- **Style:** Rounded pills with `var(--surface)` or `var(--surface-inset)`, subtle border when they need structure, and accent-strong text only when they communicate active status.
- **State:** Selected/active chips can use `var(--accent-soft)`; inactive chips should stay quiet.

### Cards / Containers

- **Corner Style:** Cards use `1.4rem`; large route panels use `2rem`.
- **Background:** `var(--surface)` for regular cards, `var(--surface-strong)` for forms and high-emphasis panels.
- **Shadow Strategy:** Follow the Flat-First Rule; use ambient shadows only for major route surfaces.
- **Border:** `1px solid var(--line)` is the default boundary.
- **Internal Padding:** `1rem` for compact cards, `1.5rem` to `2rem` for forms and major panels.

### Broadcast Board Components

- **Broadcast Hero:** Asymmetric route-level feature panel with an editorial copy block and a poster/frame visual. It should not look like a normal dashboard card.
- **Poster Frame:** Large numbered visual block that can hold episode or progress identity. Use big numerals, layered color fields, and an explicit progress bar.
- **Poster Text:** Poster labels and episode numerals must use `--broadcast-poster-text`; never use panel color over the poster background because dark mode can collapse contrast.
- **Episode Strip:** Compact horizontal list item with episode number, title, metadata, and status. This is the preferred list language for anime tracking.
- **Season Shelf:** Horizontal rail on mobile and three-column row on larger screens. It replaces repeated icon-card grids on the Home POC.
- **Broadcast Actions:** Primary actions use the same red action system as the rest of the app; secondary actions stay tonal and bordered.

### Inputs / Fields

- **Style:** Visible label, `var(--surface-inset)` field background, `var(--line)` border, `1rem` radius, `px-4 py-3` padding.
- **Focus:** Border shifts to `var(--accent)` and uses `var(--focus)` ring.
- **Error / Disabled:** Errors use red border/ring plus text in `var(--danger)`; disabled fields lower opacity and show `cursor-not-allowed`.
- **Password Visibility:** Icon button sits inside the field, uses the same focus ring, and must respect disabled state.

### Navigation

- **Style:** Rounded shell with `var(--surface)`, `var(--line)`, and subtle ambient nav shadow.
- **Default:** Muted text, quiet hover surface.
- **Active:** Inverts page foreground/background or uses red for registration/action emphasis.
- **Mobile:** Navigation wraps instead of disappearing. Touch targets should remain at least 44px tall.

### Brand Tile

The `AT` mark uses a square rounded tile, `var(--surface-strong)`, a thin top red accent, and strong foreground/background contrast. It is the main place where the brand identity can concentrate without spreading decorative gradients through content.

## 6. Do's and Don'ts

### Do:

- **Do** use `var(--page-bg)`, `var(--surface)`, `var(--surface-strong)`, `var(--line)`, and `var(--accent)` instead of hard-coded page colors.
- **Do** keep primary actions red and consistent; red means action, selected state, or AnimeTracker identity.
- **Do** preserve visible focus rings with `var(--focus)` on links, buttons, inputs, and icon controls.
- **Do** keep form labels visible and errors actionable.
- **Do** support both `:root[data-theme='light']` and `:root[data-theme='dark']` when adding page-level UI.
- **Do** prefer tonal layering and borders before adding more shadows.

### Don't:

- **Don't** create generic SaaS dashboards that could belong to any productivity app.
- **Don't** use excessive neon/cyberpunk styling; AnimeTracker is editorial anime, not an arcade wall.
- **Don't** use washed-out low-contrast gray text on tinted surfaces.
- **Don't** use decorative gradient-filled heading text.
- **Don't** use glassmorphism as a default surface treatment.
- **Don't** repeat identical icon-heading-text card grids as a page scaffold.
- **Don't** put tiny uppercase tracked eyebrows above every section; use them sparingly where they are part of a real component pattern.
- **Don't** use colored side-stripe borders on cards, list items, callouts, or alerts.

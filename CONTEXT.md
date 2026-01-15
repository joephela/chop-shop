# AI Context: Chop Shop Monorepo

This document provides essential context for AI agents and LLMs working on the **Chop Shop** repository.

## 🎯 Project Goals

Chop Shop is a premium UI component monorepo focused on high-quality, interactive React components with a focus on rich aesthetics and fluid user experiences.

## 🛠 Tech Stack

- **Framework**: React 19 (Functional components, Hooks)
- **Styling**: Tailwind CSS v4 (Using `@apply` in CSS for base styles, utility classes in TSX)
- **Icons**: `react-icons/fi` (Feather icons)
- **Build Tool**: Vite 6
- **Language**: TypeScript (Strict mode preferred)
- **Monorepo Management**: npm workspaces

## 🏗 Repository Structure

- `/apps/playground`: React/Vite sandbox for testing components. The `App.tsx` here serves as the main demo hub.
- `/packages/buttons`: Core button package containing:
  - `RadialButton.tsx`: A radial menu with screen-aware positioning.
  - `IconButton.tsx`: Base themeable button component used by `RadialButton`.
- `/assets`: Central repository for branding and media (e.g., `hero.png`).

## 🎨 Coding Standards & Patterns

- **Tailwind v4**: Use the new `@import "tailwindcss";` syntax in CSS. Base element styling should go into `@layer base`.
- **Themes**: Components support multiple themes: `berry`, `ocean`, `forest`, `volcano`. These are defined in `IconButton.tsx` and should be consistent across the repo.
- **Component Props**:
  - Always use TypeScript interfaces for props (e.g., `interface RadialButtonProps`).
  - Prefer exporting action interfaces (e.g., `RadialAction`) for consumer use.
- **Aesthetics**: Prioritize "Premium" design—vibrant colors, smooth transitions (`duration-500`), and interactive hover/focus states.

## 🤖 AI Guidelines

- When adding new icons, ensure they are imported from `react-icons/fi`.
- Maintain the "flex between" header layout in the playground `App.tsx`.
- Follow the existing theme object structure in `IconButton.tsx` when adding or modifying themes.
- Always check the root `README.md` for general setup instructions before proposing dependencies.

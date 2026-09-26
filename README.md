# Portfolio

This is my personal portfolio website. I made it to showcase my projects, design work, and what I do across software development and graphic/UI design.

## Tech stack

* React and TypeScript
* Vite
* Tailwind CSS
* Motion
* React Router
* Lucide React

## Requirements

* Node.js 18.18 or newer
* npm

## Setup

Install the dependencies:

```bash
npm install
```

## Run locally

Start the development server:

```bash
npm run dev
```

Then open the local address shown in the terminal, usually:

```text
http://localhost:5173
```

## Production

Build the website:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Useful commands

```bash
npm run dev       # start development server
npm run build     # create production build
npm run preview   # preview production build
npm run typecheck # check TypeScript
npm run check     # run checks and build
```

## Project layout

* `src/` contains the main application.
* `src/app/components/` contains the main UI sections.
* `src/app/pages/` contains the different pages.
* `src/app/data.ts` contains the portfolio content.
* `src/styles/` contains the global styles.
* `public/` contains static assets.

This is a personal portfolio project built to represent both my development and design work.

## License

The source code is released under the [MIT License](LICENSE). Fork it, use it, build
your own version.

The design work, branding, graphics, and written content are **not** covered by that
license and remain all rights reserved. That covers:

* `public/posters/`
* `public/cinetrack.webp`
* `public/favicon.svg`
* `public/resume.pdf`
* `src/app/data.ts` and the visual design of the site

If you fork this, swap in your own content and assets. Third-party components and
media keep their original licenses, listed in [ATTRIBUTIONS.md](ATTRIBUTIONS.md).

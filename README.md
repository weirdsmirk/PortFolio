# Armaan Verma — Portfolio (2026)

A minimal, editorial-inspired portfolio website showcasing engineering projects, graphic design work, and cybersecurity focus.

🔗 **Live Site:** [portfolio-lime-seven-beeqbtvrcz.vercel.app](https://portfolio-lime-seven-beeqbtvrcz.vercel.app)

---

## ✨ Features

- **Editorial Aesthetic:** High-contrast typography featuring *Instrument Serif* paired with clean utility layouts.
- **Interactive Lightbox:** Full-screen desktop image previews for design posters and project galleries.
- **Project Case Studies:** Dedicated pages for deep-dives into engineering and design works.
- **Fluid Motion:** Smooth page transitions, staggered reveal animations, and initial numeric loader powered by Motion.
- **Ambient Audio:** Built-in minimal background music player.
- **Responsive & Accessible:** Fully responsive across devices with support for prefers-reduced-motion.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [Motion](https://motion.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.18 or higher)
- **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/weirdpink/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement |
| `npm run build` | Compiles TypeScript and creates an optimized production build in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run check` | Runs TypeScript linting, static asset checks, and build verification |

---

## 📁 Project Structure

```text
├── public/                 # Static assets (images, posters, audio, resume.pdf)
├── src/
│   ├── app/
│   │   ├── components/     # UI sections (Hero, Work, About, Skills, Contact, Nav)
│   │   ├── pages/          # Home, Project Detail, Terms, Privacy, Colophon
│   │   ├── App.tsx         # Routing, layout, and scroll restoration
│   │   └── data.ts         # Central data store (projects, skills, social links)
│   ├── styles/             # Global CSS and Tailwind layers
│   └── main.tsx            # Application entry point
```

---

## ⚙️ Content Configuration

All portfolio content is organized in a single file: **[`src/app/data.ts`](src/app/data.ts)**:

- **Projects:** Add or edit project metadata, covers, case-study overviews, and galleries.
- **Skills:** Configure skill groups and technical domains.
- **Contact & Socials:** Update links for GitHub, LinkedIn, Instagram, X, and Email.
- **Audio & Resume:** Set background audio track metadata and resume download path.

---

## 👤 Author

**Armaan Verma**
- Website: [portfolio-lime-seven-beeqbtvrcz.vercel.app](https://portfolio-lime-seven-beeqbtvrcz.vercel.app)
- GitHub: [@weirdpink](https://github.com/weirdpink)
- LinkedIn: [armaantxs](https://linkedin.com/in/armaantxs)

# 🎬 SAI KRISHNA — THE SERIES

A cinematic, streaming-platform-inspired portfolio for **Sai Krishna Bethamcharla**: Creative & Technical Lead at Zai Labs Private Limited.  
Every section is an episode, every project is an Original, and the entire portfolio plays like a series.

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

> **Note:** A personal portfolio with a fictional streaming-platform aesthetic. It is not affiliated with Netflix or any other streaming service and uses none of their proprietary logos.

---

## 🚀 Run It Locally

Requires **Node.js 20+** (Node.js 22.12+ recommended).

```bash
# Clone the repository
git clone https://github.com/saikrishna-bethamcharla/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open the URL Vite prints in terminal (typically `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

The compiled static site is written to `dist/` and can be deployed directly to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 🛠️ Updating Content

**All portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).** Update this central single-source-of-truth file so project cards, detail modals, and the interactive resume stay synchronized.

| To Change | Edit Field |
| :--- | :--- |
| Name, intro, email, LinkedIn, GitHub | `profile` |
| Projects & Originals | `projects` |
| Awards & professional highlights | `achievements`, `professionalHighlights` |
| Skills & categories | `skillCategories`, `skillEvidence` |
| Seasons and episodes (My Journey) | `seasons` |
| Top 10 row | `topPicks` |
| ▶️ Play Intro highlight reel | `introSlides` |
| Profile ordering (Lead / Creative / Technical) | `viewerProfiles` |
| Opening studio card text | `profile.originalLabel` |

**Resume Asset:** Placed at `public/assets/Sai_Krishna_Bethamcharla_Resume.pdf`.

---

## 🏗️ Architecture & Component Tree

```
src/
  data/portfolio.ts        # Single source of truth (profile, projects, episodes)
  App.tsx                  # Stage manager: billboard home and overlay modals
  components/
    Navbar                 # Hide-on-scroll nav, profile switcher, mobile menu
    Hero                   # Billboard: parallax portrait, particles, light streaks, chips
    PlayIntro              # ▶️ Play Intro: zoom-into-portrait highlight reel
    ContinueWatching       # Cards with real watched progress indicators
    About                  # "The Pilot" origin episode
    Seasons / EpisodeCard  # Career journey indexed as seasons and episodes
    Originals / ProjectCard# Pinned horizontal sequence on desktop, swipe rail on touch
    ProjectModal           # Full-screen project overlay with shared-element transitions
    TopPicks               # Top 10-style trending row
    Skills                 # Skill genres displaying where each skill appears
    Achievements           # Award-poster cards + professional highlights rail
    ResumeViewer           # Designed interactive resume sheet, PDF viewer, download
    FinalCTA               # "TO BE CONTINUED..." + contact links
    CustomCursor, fx.tsx   # Dynamic cursor states, magnetic buttons, 3D tilt, text reveals
  hooks/                   # Lenis smooth scroll, media queries, watch progress
```

---

## 📄 License

MIT © [Sai Krishna Bethamcharla](https://github.com/saikrishna-bethamcharla)

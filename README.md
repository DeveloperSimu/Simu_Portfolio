<div align="center">
  <img src="public/profile.png" width="112" alt="Srimanta Bag" />

  <h1>SIMU — Personal Portfolio</h1>

  <img
    src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=21&duration=2800&pause=900&color=C4B5FD&center=true&vCenter=true&width=780&lines=Full-stack+developer;Building+thoughtful+digital+experiences;Exploring+AI+and+emerging+technology"
    alt="Animated introduction: full-stack developer, building digital experiences, exploring AI and emerging technology"
  />

  <p>
    <strong>A motion-rich portfolio for projects, ideas, and the work behind them.</strong>
  </p>

  <p>
    <a href="https://github.com/DeveloperSimu">GitHub</a>
    &nbsp;·&nbsp;
    <a href="https://www.linkedin.com/in/srimanta-bag-719793371/">LinkedIn</a>
    &nbsp;·&nbsp;
    <a href="https://x.com/Srimant44458507">X</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111827" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5" />
    <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3" />
    <img src="https://img.shields.io/badge/Supabase-Postgres-3FCF8E?logo=supabase&logoColor=white" alt="Supabase and PostgreSQL" />
  </p>
</div>

---

## About

SIMU is a responsive personal portfolio for **Srimanta Bag (Simu)**, a full-stack web developer and technology enthusiast. It brings project work, skills, experience, credentials, services, and technical writing together in one interactive experience.

The visual language pairs a dark glass-inspired interface with restrained gradients, custom illustrations, and purposeful motion. The experience is designed to feel expressive without getting in the way of the content.

## Highlights

- **Motion-led interface** — animated loading screen, scroll progress, reveal transitions, custom cursor, magnetic interactions, and tilt effects.
- **Responsive portfolio sections** — Home, About, Projects, Skills, Experience, Achievements, Services, Blog, Newsletter, and Contact.
- **Project showcase** — filterable project cards, local preview artwork, and detailed project dialogs.
- **Credentials** — certificate image previews and embedded PDF previews with links to the original credential.
- **Technical blog** — a dedicated `/blogs` archive ([page implementation](src/components/pages/BlogsPage.tsx)), topic filters, cover photography, article dialogs, and 11 curated articles.
- **Supabase integration** — published database articles, contact submissions, newsletter signups, visit counting, and live presence/activity features.
- **Accessible interactions** — semantic controls, keyboard-friendly dialogs, reduced-motion support, and descriptive loading/error states.
- **Local visual assets** — project, certificate, profile, and blog-cover images are served from `public/`.

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React 18, TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS, PostCSS |
| Motion | Framer Motion |
| Icons | Lucide React |
| Data and realtime | Supabase JavaScript client, PostgreSQL, Supabase Realtime |
| Code quality | ESLint, TypeScript |

## Getting Started

### Requirements

- Node.js 20.19+ or 22.12+
- npm
- A Supabase project for database-backed features

### Install and run

```bash
git clone https://github.com/DeveloperSimu/Simu_Portfolio.git
cd Simu_Portfolio
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
```

The client reads these variables in [`src/lib/supabase.ts`](src/lib/supabase.ts). Use a Supabase **publishable** key (or the legacy anon key); never put a `service_role` or secret key in a Vite environment variable. The `.env` file is ignored by Git.

Start the development server:

```bash
npm run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

## Supabase Setup

The database migrations are in [`supabase/migrations/`](supabase/migrations/). Apply them in timestamp order using the Supabase Dashboard's **SQL Editor**:

1. `20261031160053_create_contact_messages.sql`
2. `20261031161136_create_site_visits_counter.sql`
3. `20261031161142_create_blog_posts.sql`
4. `20261031161846_create_newsletter_subscribers.sql`

The migrations create the blog, contact, newsletter, and visit-counter database features, along with their access policies. Public blog queries return only rows where `published = true`; contact messages and newsletter emails are insert-only for visitors.

### Publish a database blog post

After applying the blog migration:

1. Open **Table Editor → `blog_posts` → Insert row** in the Supabase Dashboard.
2. Fill in `title`, a unique lowercase hyphenated `slug`, `excerpt`, `category`, `tags`, `body`, and `read_minutes`.
3. Set `published` to `true`. `published_at` can use its default.
4. Refresh the portfolio. Published rows are merged with the curated articles.

Curated articles and their metadata are maintained in [`src/data/blogPosts.ts`](src/data/blogPosts.ts). The archive route is `/blogs`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check the application |

## Project Structure

```text
public/
  blog-covers/       Blog card and article cover photos
  certificates/      Certificate PDFs and previews
  projects/          Project screenshots
src/
  components/
    layout/          Navigation, footer, loading, and site-status UI
    pages/           Standalone pages, including the blog archive
    sections/        Portfolio page sections and their components
    ui/              Shared buttons, cards, modals, and motion helpers
  data/              Portfolio content and curated blog articles
  hooks/             Reusable React hooks
  lib/               Supabase client, blog data, and shared utilities
supabase/
  migrations/        PostgreSQL schema and row-level security policies
```

## Deployment

Build the site with `npm run build` and deploy the generated `dist/` directory to a static hosting provider. Configure the two Supabase environment variables in the hosting dashboard—do not upload `.env`.

Because `/blogs` is a client-side route, configure the host to serve `index.html` for that path (SPA fallback). Make sure the same Supabase migrations have been applied to the production database.

## Security Notes

- Browser code is public: only use a publishable/anon key in `VITE_` variables.
- Keep secret/service-role keys on a trusted server; never commit them.
- Row Level Security policies are defined by the SQL migrations. Review them before changing database access.
- Do not commit `.env` or other environment-specific credentials.

## Credits

Blog cover photographs are bundled locally from [Pexels](https://www.pexels.com/license/). Interface icons are provided by [Lucide](https://lucide.dev/).

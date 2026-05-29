# BASIS

The website for the BASIS AI safety reading group.

Everything here, sessions, papers, members, is a Markdown file under `src/content/`. To add notes or a new session, fork the repo and open a PR. See [/contribute](https://basis-rg.github.io/contribute) (or `src/pages/contribute.astro`) for the templates.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:4321
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

A push to `main` triggers `.github/workflows/deploy.yml` which builds and publishes to GitHub Pages.

## Stack

- [Astro](https://astro.build) with content collections + MDX
- [Cytoscape.js](https://js.cytoscape.org/) for the concept graph and citation web
- [giscus](https://giscus.app) for GitHub-Discussions-backed comments on session pages
- [GoatCounter](https://www.goatcounter.com) for unobtrusive analytics

## To wire up before going live

These placeholders need real values:

| Where | What |
| --- | --- |
| `src/components/Giscus.astro` | `data-repo`, `data-repo-id`, `data-category`, `data-category-id` from giscus.app once the GitHub repo and Discussions are set up |
| `src/layouts/BaseLayout.astro` (footer `<script>`) | replace `basis.goatcounter.com` with the actual GoatCounter code |
| `src/pages/join.astro` | replace `FORM_URL` with the real Google Form link |
| `astro.config.mjs` | confirm `site: 'https://basis-rg.github.io'` matches the actual GitHub Pages URL |
| `src/content/members/*.md` | fill in real GitHub handles and one-line bios |

## Repo layout

```
src/
  content/
    sessions/   # 0001-…md → one per session
    papers/     # one per paper read
    members/    # one per member
    config.ts   # Zod schemas
  pages/        # routes
  components/   # Graph, SessionCard, Giscus
  layouts/      # BaseLayout
  lib/data.ts   # derived data (concept graph, citation web, member stats)
  styles/       # tokens.css + base.css
public/
  logo.png      # the BASIS compass
```

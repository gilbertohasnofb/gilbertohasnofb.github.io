# Gilberto Agostinho portfolio — Jekyll site

A minimal, custom-built Jekyll site (no third-party theme). Plain
HTML/SCSS/Liquid you fully own and can modify freely.

## Structure

```
_config.yml           site settings, nav menu, collections
Gemfile               Ruby dependencies (uses the github-pages gem)
_layouts/             page templates
_includes/            reusable snippets (nav, head, footer)
_sass/                stylesheets (partials)
assets/css/main.scss  compiles to assets/css/main.css
assets/js/            programme-notes toggle script
assets/img/           photos (about page, photography cards)
assets/scores/        PDF scores (placeholders — replace these)
_compositions/        one Markdown file per piece
_concerts/            one Markdown file per performance
_software/            one Markdown file per project
_writing/             one Markdown file per dissertation/article
_photography/         one Markdown file per photo/project card
about.md              "about" page accessible from navigation bar
compositions.md       "compositions" page accessible from navigation bar
concerts.md           "concerts" page accessible from navigation bar
software.md           "software" page accessible from navigation bar
writing.md            "writing" page accessible from navigation bar
photography.md        "photography" page accessible from navigation bar
contact.md            "contact" page accessible from navigation bar
index.html            redirects to /about/
```

## Setup

1. Rename this folder's contents into a new repo named
   `yourusername.github.io` (see the earlier setup steps you already
   have for creating the repo on GitHub).
2. In `_config.yml`, replace `yourusername` in the `url:` field, and
   set `title:` to your actual name.
3. GitHub Pages will build this natively — no GitHub Actions workflow
   needed, since we're only using GitHub Pages-supported plugins
   (`jekyll-sitemap`, `jekyll-feed`). Just push to `main` and enable
   Pages in Settings → Pages, source: `main` branch, `/ (root)` folder.
4. For local preview:
   ```bash
   bundle install
   bundle exec jekyll serve
   ```
   then open `http://localhost:4000`

## Adding a composition

Create a new file in `_compositions/`, e.g. `_compositions/2024-my-new-piece.md`:

```yaml
---
title: "My New Piece"
year: 2024
instrumentation: "violin"
duration: "4'20\""
score: "/assets/scores/my-new-piece.pdf"          # required
dedication: "for someone"                          # optional — omit to hide
soundcloud_url: "https://soundcloud.com/you/track"  # optional — omit to hide
---
Programme notes go here, as normal Markdown. Leave the file empty
below the front matter (or omit the body entirely) to hide the
"programme notes" button for this piece.
```

Then drop the actual PDF into `assets/scores/` with a matching filename.

Entries are automatically sorted by `year` (newest first) on the
`/compositions/` page — no need to manually order the files.

## Adding a concert

Create a new file in `_concerts/`, e.g. `_concerts/2025-06-01-my-concert.md`:

```yaml
---
title: "Piece Being Performed"
performer: "Performer or Ensemble Name"
organiser: "Concert Series / Festival Name"   # optional
organiser_url: "https://example.com"          # optional — omit to hide the button
venue: "Venue Name"                           # optional
city: "City"                                  # optional
country: "Country"                            # optional
date: 2025-06-01
---
```

Entries are automatically sorted by `date` (newest first). No body
text is used for concerts — everything comes from the front matter.

## Adding a software entry

Create a new file in `_software/`, e.g. `_software/03-my-tool.md`.
Since there's no date/year to sort by, entries display in the order
their files are listed — prefix filenames with `01-`, `02-`, etc. to
control the order:

```yaml
---
title: "my-tool"
url: "https://github.com/you/my-tool"   # optional — omit to hide the button
---
A short paragraph about this project goes in the body, as normal
Markdown.
```

## Adding a writing entry

Create a new file in `_writing/`, e.g. `_writing/2026-new-article.md`:

```yaml
---
title: "Article or Dissertation Title"
year: 2026
subtitle: "PhD dissertation, University Name"       # optional — shown as a plain line under the title
url: "https://university.example.edu/link-to-it"    # optional — omit to hide the button
link_label: "read article"                          # optional, defaults to "read"
---
The abstract goes in the body, as normal Markdown. It's hidden by
default behind an "abstract" toggle button (same collapsible pattern
as "programme notes" on the compositions page) — leave the body empty
to hide the button entirely for that entry.
```

Entries are automatically sorted by `year` (newest first).

## Notes

- Fonts: using **Jost** (Google Fonts) as a free, open-source
  Futura-alike for headings (bold) and body text (regular). If you
  later obtain a licensed Futura web font file, swap the `@import`/
  `<link>` in `_includes/head.html` and the `$font-*` variables in
  `_sass/_variables.scss`.
- Colors are defined as CSS custom properties in
  `_sass/_variables.scss` — edit `--color-accent` etc. to change the
  palette. The site is light-mode only.
- Placeholder PDFs in `assets/scores/` are just text files as
  stand-ins — replace them with real PDFs (same filenames, or update
  the `score:` field in each composition's front matter).
- The contact form (`_includes/contact-form.html`) uses
  [Formspree](https://formspree.io) to handle submissions without a
  backend. It's already pointed at your form
  (`https://formspree.io/f/mojgyqre`) — no further setup needed unless
  you create a new Formspree form later, in which case update the
  `action` URL in that file.

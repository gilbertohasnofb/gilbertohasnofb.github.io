# Gilberto Agostinho portfolio — Jekyll site

A minimal, custom-built Jekyll site (no third-party theme). Plain
HTML/SCSS/Liquid you fully own and can modify freely.

Live at: https://www.gilberto-agostinho.com

## Structure

```
_config.yml               site settings, nav menu, collections
Gemfile                   Ruby dependencies (uses the github-pages gem)
_layouts/                 page templates
_includes/                reusable snippets:
                            - head.html, nav.html, footer.html
                            - concert-entry.html (shared markup for one
                              concert, used by both upcoming/past lists)
                            - contact-form.html (Formspree form)
_sass/                     stylesheets (partials)
assets/css/main.scss       compiles to assets/css/main.css
assets/js/                 nav-scroll-hint.js, notes-toggle.js,
                           composition-filter.js, copy-link.js
assets/img/                photos (about page, visual cards)
assets/scores/             PDF scores (placeholders — replace these)
assets/pure-data-patches/  Pure Data / Max patch downloads
_compositions/             one Markdown file per piece
_concerts/                 one Markdown file per performance
_software/                 one Markdown file per project
_writing/                  one Markdown file per thesis/article
_visual/                   one Markdown file per photo/project card
about.md                   homepage (permalink: /) — also the "about" nav tab
compositions.md            "compositions" page
concerts.md                "concerts" page
software.md                "software" page
writing.md                 "writing" page
visual.md                  "visual" page
contact.md                 "contact" page
```

There is no `index.html` — `about.md` is set to `permalink: /`, so it
serves directly as the homepage.

## Setup

1. This repo is `gilbertohasnofb.github.io`, with a custom domain
   (`www.gilberto-agostinho.com`) configured via DNS (A records on
   the apex → GitHub Pages IPs, CNAME on `www` → the `.github.io`
   domain) and the Custom domain field in Settings → Pages.
2. `_config.yml`'s `url:` field should always match whichever domain
   is set as canonical in Settings → Pages.
3. GitHub Pages builds this natively — no GitHub Actions workflow
   needed, since only GitHub Pages-supported plugins are used
   (`jekyll-sitemap`, `jekyll-feed`). Just push to `main`.
4. For local preview:
   ```bash
   bundle install
   bundle exec jekyll serve
   ```
   then open `http://localhost:4000`. If you ever hit a Bundler
   permissions error on a fresh machine, run
   `bundle config set --local path '.vendor/bundle'` first so gems
   install locally instead of system-wide.

## Adding a composition

Create a new file in `_compositions/`, e.g. `_compositions/2026-my-new-piece.md`:

```yaml
---
title: "My New Piece"
year: 2026                                          # display text — can include extra notes,
                                                    # e.g. "2014; revised in 2025"
date: 2026-01-15                                    # real ISO date — used for sorting and
                                                    # for building the copy-link anchor
instrumentation: "violin"                           # optional
duration: "4'20\""                                  # optional
dedication: "for someone"                           # optional
note: "Commissioned by..."                          # optional, supports **bold**/*italic*
tags: ["solo"]                                      # optional — see Tag filters below
score: "/assets/scores/my-new-piece.pdf"            # optional — shows a "score" button
pure_data_patch: "/assets/pure-data-patches/x.zip"  # optional — shows a "pure data patch" button
max_msp_patch: "/assets/max-patches/x.zip"          # optional — shows a "max/msp patch" button
bandcamp_url: "https://you.bandcamp.com/track/x"    # optional — shows a "bandcamp" link button
bandcamp_embed: '<iframe ...>...</iframe>'          # optional — paste the exact embed code
                                                    # from Bandcamp's own "Share/Embed" panel;
                                                    # renders as-is, full player
soundcloud_url: "https://soundcloud.com/you/track"  # optional — embedded player
spotify_url: "https://open.spotify.com/track/..."   # optional — embedded player (track or album)
---
Programme notes go here, as normal Markdown. Leave the file empty
below the front matter (or omit the body entirely) to hide the
"programme notes" toggle button for this piece.
```

Entries are sorted by `date` (newest first) — `year` is display-only
and can contain freeform text.

### Tag filters

The compositions page has a fixed row of filter buttons: **12+
players, 6-11 players, 2-5 players, solo, open, electroacoustic**.
All start active (all pieces shown). Clicking one shows only pieces
tagged with it; clicking the same one again resets to showing all.
Pieces with no `tags` field always stay visible regardless of the
active filter. The tag list itself is hardcoded in
`_layouts/compositions.html` — edit the `composition_tags` line
there to add/remove categories.

### Copy-link

Hovering a composition's title reveals a small link icon; clicking it
copies a URL like `.../compositions/#2026-my-new-piece` to the
clipboard (built from `date`'s year + a slugified title), and visiting
that link scrolls straight to that entry.

## Adding a concert

Create a new file in `_concerts/`, e.g. `_concerts/2026-06-01-my-concert.md`:

```yaml
---
title: "Piece Being Performed"
performer: "Solo Performer Name"                    # use this OR performers, not both
performers: "Ensemble, conducted by X"              # for multiple performers/conductor credits
concert_series: "Festival or Series Name"           # optional
organiser: "Organiser Name"                         # optional
organiser_url: "https://example.com"                # optional — shows an "organiser" button
venue: "Venue Name"                                 # optional
city: "City"                                        # optional — label shows "Location:" if set
country: "Country"                                  # optional — label shows "Country:" if city is absent
note: "Radio performance"                           # optional, supports Markdown
date: 2026-06-01                                    # required — determines upcoming/past section
date_display: "2026 (Autumn, date TBC)"             # optional — overrides the displayed date text
                                                    # (date itself must still be a real, valid date
                                                    # for sorting purposes)
radio_programme: "Programme Name"                   # optional
radio_station: "Station Name"                       # optional
radio_programme_time: "9:00pm (CEST)"               # optional
radio_url: "https://example.com/listen"             # optional — shows a "radio programme" button
youtube_url: "https://www.youtube.com/watch?v=..."  # optional — embedded player
                                                    # (must be the full watch?v= URL, not a youtu.be link)
---
```

The page automatically splits entries into **upcoming concerts** and
**past concerts** by comparing each entry's `date` against today's
date at build time (day-level comparison only, time of day is
ignored) — no manual flag needed. If a concert's date passes, it
moves to "past" the next time the site is rebuilt. If there are no
upcoming concerts, a placeholder message shows instead of an empty
list, with a centered "* * *" divider between the two sections either way.

## Adding a software entry

Create a new file in `_software/`, e.g. `_software/08-my-tool.md`.
There's no date field, so entries display in file order, reversed
(highest-numbered file first) — prefix filenames with `01-`, `02-`,
etc., and add new entries with a higher number to put them at the
top without renaming existing files:

```yaml
---
title: "my-tool"
year: 2026
language: Python                              # optional
docs: "https://you.github.io/my-tool/"        # optional — shows a "docs" button
repository: "https://github.com/you/my-tool"  # optional — shows a "repository" button
---
A short paragraph about this project goes in the body, as normal
Markdown — always shown, not collapsible.
```

## Adding a writing entry

Create a new file in `_writing/`, e.g. `_writing/2026-new-article.md`:

```yaml
---
title: "Article or Thesis Title"
year: 2026                                    # must start with 4 digits — used to build
                                              # the copy-link anchor
subtitle: "PhD Thesis, University Name"       # optional — plain line under the title
link_url: "https://example.edu/link-to-it"    # optional — shows a button (NOT `url:`)
link_label: "read article"                    # optional, defaults to "read"
author: "Agostinho, G."                       # use this OR authors, not both
authors: "Rataj, J. & G. Agostinho"
university: "City, University of London"      # optional — for theses
periodical: "Leonardo"                        # optional — for journal articles
volume_issue: "**58**(4)"                     # optional, supports Markdown (e.g. bold)
publisher: "The MIT Press"                    # optional
page: "328"                                   # use this OR pages, not both
pages: "12-34"
isbn: "..."                                   # optional
issn: "0024-094X"                             # optional
full_citation: "Full formatted citation text" # optional, supports Markdown
---
The abstract goes in the body, as normal Markdown. It's hidden by
default behind an "abstract" toggle button (same collapsible pattern
as "programme notes" on the compositions page) — leave the body empty
to hide the button entirely for that entry.
```

Entries are sorted by the first 4 characters of `year` (newest first).

## Adding a visual entry

Create a new file in `_visual/`, e.g. `_visual/08-my-project.md`. Like
software, there's no date field — entries display in file order,
reversed (highest-numbered file first):

```yaml
---
image: "/assets/img/my-photo.jpg"
title: "Project title"               # optional — omit to show just the image, no overlay text
year: 2026                           # optional
text_color: "#ffffff"                # optional, controls overlay text color, defaults to white
project_url: "https://example.com"   # optional — makes the whole card a clickable link
                                     # (do NOT use `url:` — it's a reserved Jekyll field name
                                     # and silently won't work)
---
```

Cards are full-width, fixed aspect ratio (matches the about-page
photo's proportions), and brighten slightly on hover.

## Notes

- Fonts: **Jost** (Google Fonts), a free Futura-alike — bold for
  headings/nav, regular for body. Swap the `<link>` in
  `_includes/head.html` and the `$font-*` variables in
  `_sass/_variables.scss` if you ever get a licensed Futura file.
- Colors are CSS custom properties in `_sass/_variables.scss`. The
  site is light-mode only (no dark mode toggle).
- Nav: two right-aligned rows (name, then links). On narrow screens
  the link row becomes horizontally scrollable with a fade-shadow
  hint at either edge (`assets/js/nav-scroll-hint.js`) rather than
  wrapping to multiple lines. The active page's link is bold, sized
  via a width-reserving CSS trick so it doesn't shift neighboring
  links when toggled.
- Placeholder PDFs in `assets/scores/` are stand-in text files —
  replace with real PDFs (same filenames, or update each
  composition's `score:` field).
- The contact form (`_includes/contact-form.html`) uses
  [Formspree](https://formspree.io), already pointed at
  `https://formspree.io/f/mojgyqre` — update the `action` URL there
  if you ever create a new Formspree form.
- Contact page social icons (SoundCloud, Bandcamp, GitHub, Instagram,
  Flickr, LinkedIn) are centered and width-matched to the contact
  form via `_sass/_social.scss`.
- `url:` is a reserved Jekyll field name for collection documents —
  never use it as a custom front-matter key (this bit the `visual`
  collection once already; `project_url` is used there instead).
  Same caution applies to `layout`, `permalink`, `date`, `categories`,
  `tags` (already used deliberately on compositions), and `collection`.
- VS Code may show false-positive CSS lint warnings on inline
  `style="{{ ... }}"` attributes and on `main.scss`'s Jekyll front
  matter block — these don't affect the actual build, just editor
  linting quirks.
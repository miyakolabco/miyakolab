# Miyako Lab — Website

Built with [Next.js](https://nextjs.org) and deployed on [Vercel](https://vercel.com).

A portfolio-first site: two pages, work shown up front, direct contact.

---

## How to update the site

The site auto-redeploys whenever you change files on GitHub. To edit:

1. Go to your GitHub repo
2. Click the file you want to change → click the **pencil icon**
3. Make your edit → click **Commit changes**
4. Vercel redeploys within ~1 minute

### Common edits

| Want to change… | Edit this file |
|---|---|
| **Your portfolio pieces** (add/remove/reorder work) | `lib/work.js` |
| **Studio details** — live web address, email, WhatsApp, Instagram, tagline, search keywords | `lib/site.js` |
| **Services** list on the homepage | `app/page.jsx` — the `SERVICES` array near the top |
| **Hero statement** ("We design for places that live after dark.") | `app/page.jsx` — the three `WordReveal` lines |
| **Contact page wording** | `app/contact/page.jsx` |
| **Footer** | `components/Footer.jsx` |
| **Colours / fonts** | `styles/globals.css` — the `:root` block at the top |

**One thing to check:** `lib/site.js` has `url: "https://miyakolab.co"`. If the site
is still on the free Vercel address, change that to `"https://miyakolab.vercel.app"`
until the custom domain is connected. It's used for the sitemap, share previews
and search-engine data, so it should match where the site really lives.

---

## Adding portfolio work

`lib/work.js` is the one file that controls everything in the work grid.
Each piece is one entry. To add a piece, copy an existing entry and change
the fields. Key fields:

- `category` — `"video"`, `"flyers"`, `"epk"` or `"web"` (which tab it appears under)
- `media` — one of:
  - **Vimeo video:** `{ type: "vimeo", id: "1192188941" }` — the numeric ID
    from the Vimeo URL (`vimeo.com/1192188941`). Vimeo hosts the file; it
    plays inside the site's own frame with all Vimeo branding hidden.
  - **Flyer / single image:** `{ type: "image", src: "/my-flyer.jpg" }` — file in `public/`
  - **EPK / deck (multi-page):** `{ type: "pages", srcs: ["/p1.jpg", "/p2.jpg", …] }`
    — one image per page, all in `public/`. Opens with its own page swipe.
  - **Website:** `{ type: "site", url: "https://…", shot: "/screenshot.jpg" }`
    — `shot` is a screenshot of the site in `public/` (optional; a placeholder
    shows until you add one). All websites open together as one cascading
    stack of browser windows in the viewer; tapping a window visits the site.
- If you don't have the media yet, leave out `id` / `src` / `shot` — a styled
  placeholder shows instead.

Keep images web-sized (under ~500 KB each). Big files slow the site down on phones.

### How the viewer works

Tapping any piece opens the full-size viewer. Swipe **up / down** to move
through pieces in the same category, **left / right** to jump between
categories (Video → Flyers → EPKs → Websites). EPKs have their own page
swipe, tap zones on each side, and pinch-to-zoom; on a phone they ask to be
rotated to landscape. Videos tap to pause and have a mute button (browsers
always start autoplay muted — that's a browser rule, not ours).

---

## Search engines & sharing

Already set up — nothing to do unless details change:

- **Page titles & descriptions** come from `lib/site.js` (and `app/contact/layout.jsx` for the contact page).
- **Share preview image** (what shows when the link is sent on WhatsApp / Instagram / iMessage)
  is generated automatically from the logo and tagline: `app/opengraph-image.jsx`.
- **Favicon + home-screen icon**: `app/icon.svg`, `app/apple-icon.jsx`.
- **sitemap.xml / robots.txt**: `app/sitemap.js`, `app/robots.js`.
- **Structured data** (tells Google what the studio is and where it is): in `app/layout.jsx`.

When you're ready to run ads, add your analytics or pixel snippet to `app/layout.jsx`.

---

## Structure

```
miyakolab-next/
├── app/
│   ├── page.jsx              # Homepage — hero, services strip, work grid
│   ├── contact/page.jsx      # Contact — email + WhatsApp, no form
│   ├── contact/layout.jsx    # Contact page title/description
│   ├── layout.jsx            # Wraps every page (nav, fonts, cursor, metadata)
│   ├── not-found.jsx         # 404 page
│   ├── icon.svg              # Favicon
│   ├── apple-icon.jsx        # iPhone home-screen icon (generated)
│   ├── opengraph-image.jsx   # Share preview image (generated)
│   ├── sitemap.js            # sitemap.xml
│   └── robots.js             # robots.txt
├── components/
│   ├── Nav.jsx               # Top navigation
│   ├── Footer.jsx            # Site footer
│   ├── Logo.jsx              # Logo components
│   ├── Anim.jsx              # Cursor, page transitions, scroll reveals, marquee
│   ├── Shared.jsx            # Media placeholder
│   ├── VimeoPlayer.jsx       # Chrome-free Vimeo embed with our own controls
│   └── Lightbox.jsx          # Full-size swipe viewer
├── lib/
│   ├── work.js               # YOUR PORTFOLIO — edit this to manage work
│   ├── site.js               # YOUR STUDIO DETAILS — address, contact, tagline
│   ├── brand.js              # Logo vector data (shared by logos, icons, share image)
│   └── navigation.js         # Routing + curtain transition
├── public/                   # Images: flyers, EPK pages, site screenshots
├── styles/globals.css        # All colours, fonts, animations, responsive rules
└── package.json
```

---

## Running locally (optional, for developers)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Requires [Node.js](https://nodejs.org) (LTS).

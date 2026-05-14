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
| **What we do** list on the homepage | `app/page.jsx` — the `SERVICES` array near the top |
| **Hero tagline** | `app/page.jsx` |
| **Contact email / WhatsApp number / Instagram** | `app/contact/page.jsx` — the constants near the top |
| **Footer links** | `components/Footer.jsx` |
| **Colours / fonts** | `styles/globals.css` — the `:root` block at the top |

---

## Adding portfolio work

`lib/work.js` is the one file that controls everything in the work grid.
Each piece is one entry. To add a piece, copy an existing entry and change
the fields. Key fields:

- `category` — `"video"`, `"flyers"`, or `"print"` (controls which tab it appears under)
- `media` — for video: `{ type: "video", src: "/my-clip.mp4", poster: "/my-poster.jpg" }`
            for image: `{ type: "image", src: "/my-flyer.jpg" }`
- If you don't have the file yet, leave `src: ""` — a styled placeholder shows instead

To use a real file: drop it into the `public/` folder in your repo, then
reference it as `/filename.mp4` (the leading slash means "the public folder").

### The homepage showreel

The big "M" on the homepage is a mask for a showreel video. To use it:
1. Put your video in `public/` (e.g. `public/showreel.mp4`)
2. In `app/page.jsx`, find `<MShowreel />` and change it to `<MShowreel src="/showreel.mp4" />`

Until then it shows an animated placeholder.

---

## Structure

```
miyakolab-next/
├── app/
│   ├── page.jsx           # Homepage — hero, services strip, work grid
│   ├── contact/page.jsx   # Contact — email + WhatsApp, no form
│   └── layout.jsx         # Wraps both pages (nav, fonts, cursor)
├── components/
│   ├── Nav.jsx            # Top navigation
│   ├── Footer.jsx         # Site footer
│   ├── Logo.jsx           # Logo SVGs
│   ├── Anim.jsx           # Cursor, page transitions, scroll reveals
│   ├── Shared.jsx         # Media placeholders, video slots, M showreel
│   └── Lightbox.jsx       # Full-size work viewer
├── lib/
│   ├── work.js            # YOUR PORTFOLIO — edit this to manage work
│   └── navigation.js      # Routing + curtain transition
├── styles/
│   └── globals.css        # All colours, fonts, animations, responsive rules
└── package.json
```

---

## Running locally (optional, for developers)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Requires [Node.js](https://nodejs.org) (LTS).

---

## Notes

- **Responsive** — adapts to phones, tablets, desktops. Breakpoints are at the
  bottom of `styles/globals.css`.
- **Video & image placeholders** — every work piece and the homepage showreel
  show a styled placeholder until you add a real file (see "Adding portfolio work").
- Fonts (Geist, Space Mono, Newsreader, Noto Sans JP) load automatically from Google Fonts.
- The custom cursor only appears on devices with a mouse — touchscreens see the normal cursor.

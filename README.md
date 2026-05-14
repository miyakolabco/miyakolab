# Miyako Lab — Website

Built with [Next.js](https://nextjs.org) and deployed on [Vercel](https://vercel.com).

---

## How to get this website online (no coding required)

You'll do this once. After that, the site is live and you can stop here.

### Step 1 — Make a GitHub account (~3 min)

GitHub is where your website's code will live online.

1. Go to **[github.com](https://github.com)** and click **Sign up**.
2. Use any email and pick a username (this will be in your site's URL later).
3. Verify your email when prompted.
4. Pick the **Free** plan when asked.

### Step 2 — Upload this folder to GitHub (~5 min)

1. Once signed in, click the **+** in the top right → **New repository**.
2. Name it `miyakolab` (lowercase, no spaces).
3. Leave it **Public**.
4. Don't add a README, .gitignore, or license — we already have those.
5. Click **Create repository**.

You'll see a page with instructions. Look for the section that says **"…or upload an existing file"** — click that link.

6. Drag the **entire contents** of this folder (everything: `app`, `components`, `lib`, `public`, `styles`, `package.json`, `next.config.js`, `.gitignore`, `jsconfig.json`, `README.md`) into the upload box.
   - ⚠️ Don't drag the outer `miyakolab-next` folder itself — drag its **contents**.
7. Scroll down, click **Commit changes**.

The upload may take a minute. When done, you should see all the files listed on your repo's page.

### Step 3 — Make a Vercel account & deploy (~5 min)

Vercel is what puts your website online for free.

1. Go to **[vercel.com](https://vercel.com)** and click **Sign Up**.
2. Choose **Continue with GitHub** — this links the two accounts.
3. Pick the **Hobby (Free)** plan.
4. Once in, click **Add New… → Project**.
5. You'll see your `miyakolab` repository in the list. Click **Import** next to it.
6. Vercel auto-detects Next.js. Don't change any settings — just click **Deploy**.

Wait ~2 minutes. You'll see a celebration screen with a URL like `miyakolab-xyz123.vercel.app`. **That's your live site.** Click it to see it.

### Step 4 — Connect your own domain (optional, ~5 min)

If you want a real domain like `miyakolab.com` instead of the long Vercel URL:

1. Buy a domain anywhere (Namecheap, Cloudflare, Google Domains — all roughly $10–15/year).
2. In Vercel, go to your project → **Settings → Domains**.
3. Type your domain (e.g. `miyakolab.com`) and click **Add**.
4. Vercel will show you 2–3 lines of "DNS records" to copy.
5. Paste those records into your domain registrar's DNS settings.
6. Wait 5–30 minutes. Done.

Vercel handles HTTPS (the little lock icon in the browser) automatically.

---

## How to update the site later

You have two options:

### Option A — Ask Claude (easiest)

Paste me a chat message saying what you want changed (e.g. "add a new project called Tatsumi Tokyo to the work list"). I'll give you the updated file contents. To apply them:

1. Go to your GitHub repo
2. Click the file you want to update
3. Click the **pencil icon** (edit)
4. Paste the new contents
5. Click **Commit changes**

Vercel auto-redeploys within ~1 minute.

### Option B — Edit directly on GitHub

Same as above, but you find and edit the right file yourself. Common things to edit:

| Want to change… | Edit this file |
|---|---|
| The list of projects | `lib/work.js` |
| Studio bio, manifesto, founder | `app/studio/page.jsx` |
| Services descriptions | `app/services/page.jsx` |
| Hero tagline / homepage | `app/page.jsx` |
| Contact form / sidebar info | `app/contact/page.jsx` |
| Footer (email, social links) | `components/Footer.jsx` |
| Colors, fonts | `styles/globals.css` (the `:root` block at the top) |

---

## What's in this project

```
miyakolab-next/
├── app/                      # The pages of your website
│   ├── page.jsx              #   Home (Work index)
│   ├── services/page.jsx     #   Services
│   ├── studio/page.jsx       #   Studio
│   ├── contact/page.jsx      #   Contact
│   ├── work/[id]/page.jsx    #   Case study (dynamic, one per project)
│   └── layout.jsx            #   Wraps every page (nav, fonts, etc.)
├── components/               # Reusable pieces
│   ├── Nav.jsx               #   Top navigation
│   ├── Footer.jsx            #   Site footer
│   ├── Logo.jsx              #   Logo SVGs
│   ├── Anim.jsx              #   Cursor, page transitions, reveals
│   └── Shared.jsx            #   Crop frames, media placeholders
├── lib/                      # Data and utilities
│   ├── work.js               #   Your project list
│   └── navigation.js         #   Routing + curtain transition
├── styles/
│   └── globals.css           #   All colors, fonts, animations
├── package.json              # Tells Next.js what dependencies to install
├── next.config.js            # Next.js settings
└── README.md                 # This file
```

---

## Running locally (optional, for developers)

If you ever want to preview changes on your computer before pushing them live:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

You'll need [Node.js](https://nodejs.org) installed (download the LTS version).

---

## Notes

- The site is **responsive** — it adapts to phones, tablets, and desktops. The layout breakpoints live at the bottom of `styles/globals.css` under the "RESPONSIVE" heading.
- The site uses Geist, Space Mono, Newsreader, and Noto Sans JP from Google Fonts — loaded automatically.
- Project images are currently stylized SVG placeholders. To use real photos, drop them in the `public/` folder and update the `MediaPlaceholder` calls to use `<img src="/your-image.jpg">` instead.
- The custom cursor only shows on devices with a real mouse — touchscreens see the regular cursor.
- The Osaka clock on the Contact page is always live (Japan Standard Time, regardless of where the visitor is).

# Rehman's Foundation

A Next.js website for Rehman's Foundation with Supabase for auth and data,
deployed on Vercel.

**Stack:** Next.js 14 (App Router, JavaScript) · Supabase (Postgres + Auth) · Vercel

---

## What is already built

| Page | Path | Notes |
|---|---|---|
| Home | `/` | Hero with the weekly commitments strip, causes, impact, featured campaigns, events, FAQ |
| About | `/about` | Mission, vision, seven values, three founders |
| Campaigns | `/campaigns` | All 14 campaigns grouped by the four causes |
| Campaign detail | `/campaigns/[slug]` | One page per campaign, generated from `src/lib/content.js` |
| Events | `/events` | The four regular events with their brochures |
| Donate | `/donate` | Campaign picker, amount presets, writes to `donations` |
| Volunteer | `/volunteer` | Writes to `volunteers` |
| Contact | `/contact` | Writes to `messages` |
| Sign in / Sign up | `/login`, `/signup` | Supabase email + password auth |
| Dashboard | `/dashboard` | Protected. Donation history, monthly commitments, joined events |
| Admin | `/admin` | Protected + role-gated. All submissions in one view |

A chatbot button sits bottom-right on every page (`src/components/ChatSlot.js`).
It is a placeholder — wire your NGO AI Assistant into it later.

---

## Step 1 — Get the code running locally

You need **Node.js 18.17 or newer**. Check with `node -v`. If you don't have it,
install the LTS build from nodejs.org.

1. Unzip the project folder somewhere sensible, e.g. `Documents/rehmans-foundation`.
2. Open **VS Code** → `File` → `Open Folder` → pick that folder.
3. Open the built-in terminal: `` Ctrl+` `` (backtick).
4. Install the packages:

   ```bash
   npm install
   ```

Don't run `npm run dev` yet — it needs Supabase keys first.

---

## Step 2 — Create the Supabase project

1. Go to **supabase.com** and sign in with GitHub.
2. Click **New project**.
   - Name: `rehmans-foundation`
   - Database password: generate one and **save it in a password manager**
   - Region: pick the closest (Singapore or Frankfurt from Pakistan)
3. Wait about two minutes for it to finish provisioning.

### Create the tables

1. In the Supabase sidebar, open **SQL Editor** → **New query**.
2. Open `supabase/schema.sql` from this project, copy the whole file.
3. Paste it into the SQL editor and click **Run**.
4. You should see "Success. No rows returned."
5. Check **Table Editor** — you should now have `profiles`, `donations`,
   `volunteers`, `event_registrations`, and `messages`.

### Turn off email confirmation while developing

Signing up is annoying to test if every account needs an email click.

1. **Authentication** → **Sign In / Providers** → **Email**
2. Turn **Confirm email** off.
3. Turn it back on before you present or deploy for real.

### Copy your keys

1. **Project Settings** → **API**
2. Copy the **Project URL** and the **anon public** key.

> The anon key is safe in frontend code — row level security in the schema is
> what protects the data. Never copy the `service_role` key into this project.

---

## Step 3 — Add your environment variables

1. In VS Code, duplicate `.env.local.example` and rename the copy to `.env.local`.
2. Fill it in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   NEXT_PUBLIC_ADMIN_EMAIL=rehmansfoundation@gmail.com
   ```

3. Save. `.env.local` is already in `.gitignore`, so it will never reach GitHub.

Now start the site:

```bash
npm run dev
```

Open **http://localhost:3000**.

### Test it end to end

1. Go to `/signup` and create an account.
2. Go to `/donate`, pick a campaign, confirm.
3. Go to `/dashboard` — your donation should be listed.
4. Check Supabase **Table Editor** → `donations` — the row is there.

### Make yourself an admin

1. Supabase → **Table Editor** → `profiles`
2. Find your row, change `role` from `member` to `admin`, save.
3. Sign out and back in on the site, then visit `/admin`.

---

## Step 4 — Push to GitHub from VS Code

1. On **github.com**, click **New repository**.
   - Name: `rehmans-foundation`
   - Keep it **Private** while you work on it
   - Do **not** tick "Add a README" — the project already has one
   - Click **Create repository**, then copy the repo URL

2. Back in VS Code's terminal:

   ```bash
   git init
   git add .
   git commit -m "Rehman's Foundation website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/rehmans-foundation.git
   git push -u origin main
   ```

3. Refresh the GitHub page — your files should be there, and `.env.local`
   should **not** be.

After this, use the **Source Control** tab in VS Code (the branch icon in the
left sidebar) instead of typing git commands: write a message, click
**Commit**, then **Sync Changes**.

---

## Step 5 — Deploy to Vercel

1. Go to **vercel.com** and sign in with GitHub.
2. **Add New** → **Project** → **Import** your `rehmans-foundation` repo.
3. Vercel detects Next.js automatically. Leave the build settings alone.
4. Expand **Environment Variables** and add both of these:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon public key |

5. Click **Deploy** and wait a couple of minutes.
6. You get a URL like `rehmans-foundation.vercel.app`.

### Tell Supabase about the live URL

Auth redirects will break otherwise.

1. Supabase → **Authentication** → **URL Configuration**
2. **Site URL**: your Vercel URL
3. **Redirect URLs**: add `https://your-app.vercel.app/auth/callback`

From now on, every `git push` to `main` redeploys automatically.

---

## Step 6 — Editing content

Almost all the text lives in **`src/lib/content.js`**. Change the copy there and
every page updates. That file holds:

- `org` — name, email, phone, address
- `mission`, `vision`, `values`, `founders`
- `causes` — the four cause areas
- `campaigns` — all 14, each with a slug, summary, detail, and ask
- `events` — the four recurring events and their brochure images
- `impact` — the statistics on the homepage (**these are invented placeholders — replace them**)
- `faqs`

Colours and fonts are at the top of **`src/app/globals.css`** under `:root`.

Images live in **`public/`** — `logo.jpg` and `events/*.jpg`.

---

## Step 7 — What to add next

**Payments.** The donate form records a pledge with `status: 'pending'` but
charges nothing. To make it real, add Stripe or Razorpay, then write the
transaction id back into `payment_ref` and flip `status` to `completed`.

**The chatbot.** `src/components/ChatSlot.js` is the mounting point. Your NGO
AI Assistant can read campaign and FAQ data straight out of
`src/lib/content.js`, or you can move that content into Supabase tables and
query it.

**Admin editing.** `/admin` is read-only. Adding update and delete needs
matching RLS policies in Supabase.

---

## Troubleshooting

**"Invalid API key"** — `.env.local` is missing or misspelled. Restart
`npm run dev` after editing it; env changes are not hot-reloaded.

**Donation submits but no row appears** — check RLS policies ran. Re-run
`supabase/schema.sql`; it is safe to run more than once.

**`/admin` says not an admin** — your `profiles.role` is still `member`, or you
haven't signed out and back in since changing it.

**Build fails on Vercel but works locally** — you almost certainly forgot the
environment variables in the Vercel project settings.

**Images 404 after deploy** — file names in `public/` are case-sensitive on
Vercel even though they aren't on Windows.

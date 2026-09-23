# Ration Setu – Smart FPS Queue & Distribution System

Student Innovation Prototype (SIH). A React + Vite + Tailwind single-page app
simulating a unified online/QR token queue for Fair Price Shops.

This project is self-contained — it does not depend on Claude, any Claude
artifact runtime, or any external icon library. All icons are inline SVG,
and the Ration Setu logo is bundled locally as a static asset.

## Project structure

```
ration-setu/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
├── public/
│   └── favicon.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/
    │   └── ration-setu-logo.png
    └── components/
        └── RationSetuApp.jsx   (full app: beneficiary, dealer, admin views)
```

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This outputs a static site into `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploy to Netlify

### Option A — Drag and drop (fastest)
1. Run `npm install` then `npm run build` locally.
2. Go to https://app.netlify.com/drop
3. Drag the generated `dist/` folder onto the page.
4. Netlify gives you a live URL immediately (e.g. `https://random-name.netlify.app`).
5. Optional: rename the site under Site settings → Change site name.

### Option B — Connect a Git repository (recommended for ongoing edits)
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Netlify: **Add new site → Import an existing project**.
3. Pick the repo. Netlify will read `netlify.toml` automatically and set:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**. Every future push redeploys automatically.

### Option C — Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --build --prod
```

No environment variables or backend services are required for the demo.
Queue state, notifications, history, complaints, and token actions are
persisted in browser local storage so a refresh does not lose the demo data.
The storage key is isolated in `src/components/RationSetuApp.jsx` and can be
replaced with a Supabase data adapter once the target project is decided.

### Beneficiary data adapter and MySQL API

The beneficiary login now includes 12 functional seeded records (`BEN-001`
through `BEN-012`). Enter a `BEN-*` ID or the displayed ration-card number
after the demo OTP step to load the selected name, family, card details, FPS,
entitlements, token ownership, and beneficiary notifications. These records
The real API is `backend/server.js`; the browser never connects directly to
MySQL. It uses `mysql2`, server-only environment variables, CORS, validation,
and transaction-locked token creation. Endpoints are:

- `GET /health`
- `GET /beneficiaries` and `GET /beneficiaries/:id` (ID, card number, or mobile)
- `GET /beneficiaries/:id/tokens`
- `POST /beneficiaries/:id/tokens` with `{ "mode": "online" | "qr" }`
- `DELETE /tokens/:tokenId` (waiting tokens only)

Setup:

```bash
copy backend\.env.example backend\.env
# Fill MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
npm install
mysql -u root -p -e "CREATE DATABASE ration_setu"
mysql -u root -p ration_setu < backend/schema.sql
npm run api:seed
npm run api
```

For an existing database created before the richer profile fields were added,
apply `backend/migrations/002_beneficiary_profile_detail.sql` before running
the seed command. Fresh databases can use `backend/schema.sql` directly.

Set `VITE_BENEFICIARY_API_URL=http://localhost:8787` in `.env.local` and
restart Vite. The login then loads profiles from MySQL through the API. If
this variable is absent, the frontend deliberately uses its credential-free
local seed. If it is set but the API is unavailable, the UI reports the outage
instead of silently pretending the database is connected. Deploy the API and
frontend separately, set `CORS_ORIGIN` to the deployed frontend origin, and
never expose MySQL credentials or put them in Vite variables.

### Optional Supabase WhatsApp persistence

The WhatsApp operations panel is explicitly a mock service. It works without
Supabase and stores its shared activity in the browser demo state. To persist
message activity in Supabase, copy `.env.example` to `.env.local` and set:

```bash
VITE_SUPABASE_URL=https://occnwieivslpjagdhemi.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

`VITE_SUPABASE_URL` must be the base project URL above, not the REST endpoint
(`https://occnwieivslpjagdhemi.supabase.co/rest/v1/`). The repository appends
`/rest/v1/whatsapp_messages` itself.

For local development, put the publishable/anon key in an untracked
`.env.local` file. For Vercel, open **Project Settings → Environment
Variables**, add `VITE_SUPABASE_URL` with the base URL and
`VITE_SUPABASE_ANON_KEY` with the publishable/anon key for the required
environments, then redeploy. Do not request, commit, or expose a service-role
key in a browser build.

Only a publishable/anon key belongs in frontend environment variables. Never
put a Supabase service-role key in `.env.local`, source code, or a deployed
client bundle. The repository adapter is `src/services/whatsappRepository.js`.

Create the following table and enable appropriate Row Level Security policies
before enabling persistence:

```sql
create table public.whatsapp_messages (
  id bigint generated by default as identity primary key,
  contact_id text not null,
  contact_name text not null,
  phone_number text not null,
  message text not null check (char_length(message) between 1 and 240),
  status text not null check (status in ('queued', 'sent', 'delivered')),
  sent_at timestamptz not null
);
```

## What's included

- Beneficiary flow: splash → mobile+OTP+ration-card login → home dashboard
- **Two distinct, separately-labeled entry points** that both feed the same unified queue engine:
  - "Book Online Slot" — home booking with date/time slot selection, OTP-verified
  - "Get Offline QR Token" — at-shop QR scan flow
- Digital e-Ration Card: card number, category (PHH), e-KYC status, family count
- Family Members view: relationship, age, per-member e-KYC status
- Monthly entitlement with entitled / issued / remaining quantities per commodity
- FPS stock transparency: Available / Limited / Out of Stock (3-state, shop-level)
- Ration transaction history with a digital receipt view per completed transaction
- Complaint / discrepancy reporting: 6 issue categories, complaint ID, status tracking (Submitted → Under Review → Resolved)
- Realistic notifications: slot confirmed, turn approaching, reach the shop, transaction completed, entitlement available
- ONE unified queue shared by both entry methods — the core USP
- Live queue tracking with real-time position/wait updates
- Dealer dashboard: online vs QR token counts, Call Next Token, Mark No-Show, Verify Token, Complete Distribution, shop stock view
- Beneficiary and dealer views are enabled in the first prototype; admin
  analytics remains in the source for a later phase
- Hindi/English language toggle (Hindi default)

## Notes

- This is a demo prototype with simulated/mock data only. It is explicitly
  labeled "Student Innovation Prototype" in the UI and does not claim to be
  an official government application or a replacement for PDS/ePoS/Aadhaar
  authentication.
- The Ration Setu logo (`src/assets/ration-setu-logo.png`) is used exactly
  as provided, unmodified, and is also used as the site favicon.

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

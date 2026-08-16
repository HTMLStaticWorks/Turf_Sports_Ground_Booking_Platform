# turfz — Premium Modern Sports Venue Booking Marketplace

**turfz** is a high-energy, responsive web application and digital marketplace template built for sports venue aggregation, football/cricket turf slot booking, team matchmaking, and stadium host management.

---

## 🚀 Key Features

- **Energetic Sports Visual Identity**: Stadium dark aesthetics with electric turf green (`#00E676`), cyan (`#00E5FF`), and volt yellow accents, rounded glassmorphic components (`16px` border-radius), and sports imagery.
- **Typography Scale**: Google Fonts (`Outfit` for headings & `Plus Jakarta Sans` for body text) with heading weights strictly $\le 580$ (`font-weight: 580` max).
- **12 Included Pages**:
  - `index.html` — Homepage with location search bar, live slot picker matrix, categories, and top turfs.
  - `home2.html` — Tournament & Community Homepage with city zone explorer & corporate calculator.
  - `services.html` — Turf Directory with multi-criteria filters (sport, price slider, amenities).
  - `about.html` — Platform story, 3-step timeline, and metrics counter.
  - `blog.html` — Sports coaching & venue technology articles.
  - `blog-single.html` — Full article view with comments form & social share.
  - `contact.html` — Support helpline & Turf Host Onboarding form.
  - `login.html` — Centered login UI (Email/Password, Google & Apple OAuth, link to Register - **NO header/theme toggle**).
  - `register.html` — Centered registration UI (Name, Email, Password, Confirm, T&C check - **NO header/theme toggle**).
  - `dashboard.html` — Dual Customer & Host Control Panel (Overview, Hourly Slot Matrix, Squad Builder, QR Ticket Generator, Host Rates Manager).
  - `404.html` — Sports "Out of Bounds" 404 page.
  - `coming-soon.html` — Tournament cup countdown page with JS timer.

- **Interactive Engines**:
  - Real-time slot schedule matrix picker with instant booking rate calculator.
  - Sidebar & top multi-filter for ground directory.
  - Client-side form validation (email format, password min length, password match, terms checkbox, inline success alerts).
  - QR Code e-ticket generator modal preview.
  - Mobile slide-drawer navigation for viewports $\le 1024\text{px}$.
  - Full RTL layout toggle via `dir="rtl"` with dedicated `assets/css/rtl.css`.
  - Dark / Light mode toggle with `localStorage` persistence.

---

## 📁 File Structure

```
d:/project 2/Turf & Sports Ground Booking Platform/
├── index.html
├── home2.html
├── services.html
├── about.html
├── blog.html
├── blog-single.html
├── contact.html
├── login.html
├── register.html
├── dashboard.html
├── 404.html
├── coming-soon.html
├── assets/
│   ├── css/
│   │   ├── style.css    # Main design tokens, dark mode, animations & layouts
│   │   └── rtl.css      # Right-to-Left layout mirror overrides
│   └── js/
│       ├── main.js       # Navbar drawer, theme switcher, RTL toggle, slot picker, validation
│       └── dashboard.js  # Dashboard tab switcher, squad builder, QR ticket modal
└── README.md
```

---

## 🛠️ How To Run Locally

1. Open the project root folder in any local web server or live preview tool (e.g., VS Code Live Server or Python HTTP Server).
2. Command line example:
   ```bash
   npx http-server -p 8000
   ```
3. Navigate to `http://localhost:8000/index.html` in your web browser.

---

## 🌐 RTL & Theme Customization

- **RTL Mode**: Click the `⇄` button in the header (desktop) or inside the mobile drawer. It toggles `dir="rtl"` on `<html>` and applies `assets/css/rtl.css`.
- **Dark/Light Mode**: Click the Sun/Moon icon in the navbar. Settings persist in `localStorage`.

<div align="center">

<h1>🧭 CurRoute</h1>

<h3>A premium, privacy-first daily expense &amp; income tracker.<br/>No cloud. No accounts. No ads. Just your money, on your terms.</h3>

<p>
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-black?style=for-the-badge&logo=apple&logoColor=white" />
  <img src="https://img.shields.io/badge/data-100%25%20on--device-2F5233?style=for-the-badge&logo=shield&logoColor=white" />
  <img src="https://img.shields.io/badge/built%20with-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-B8923F?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-Personal%20Use-9C3B3B?style=for-the-badge" />
</p>

<p>
  <a href="https://www.linkedin.com/in/madhav-kartheek1811/">
    <img src="https://img.shields.io/badge/-Connect_with_the_Creator-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
</p>

</div>

<br/>

<p align="center">
  <img src="screenshots/ledger.png" width="220" />
  <img src="screenshots/analysis.png" width="220" />
  <img src="screenshots/profile.png" width="220" />
  <img src="screenshots/add-entry.png" width="220" />
</p>

<br/>

## Why CurRoute?

Every other expense tracker wants your email, wants to sync to a cloud, and looks like a spreadsheet wearing a UI. **CurRoute doesn't.**

It's a Progressive Web App you install straight to your home screen — on iPhone *and* Android, from the same codebase — with an Apple-inspired feel: spring-eased transitions, a shared-element profile animation, and a distinctive passbook-style design instead of another generic finance template. Every number you enter stays on your device, permanently, unless you choose to export it yourself.

> **No backend. No database. No analytics SDKs. No tracking. Ever.**

<br/>

## ✨ What it does

<table>
<tr>
<td width="50%" valign="top">

### 💳 Track everything
- Expenses **and** income, side by side
- 18+ categories, or add your own
- Payment method — Online (30+ UPI apps, 16 international) or Offline
- Transaction ID, merchant, notes

### 🔍 Find anything
- Tap the month card to drill into every transaction
- Jump to any date with the calendar picker
- Filter by type, category, amount, payment mode, or search text

### 📊 Understand your money
- Weekly / Monthly / Yearly analysis
- Bar charts, category donut charts
- Period-over-period comparison
- Downloadable CSV or printable PDF statements

</td>
<td width="50%" valign="top">

### 🔒 Actually private
- PIN lock, hashed — never stored in plaintext
- Face ID / Touch ID via WebAuthn
- Zero network calls except an optional, anonymous currency-rate lookup

### 🌍 Built for real life
- 110 world currencies + live converter
- Light / Dark mode
- Daily reminder notifications
- 🔥 Streak tracking to build the habit

### 📥 Bring your history with you
- Import CSV or text-based PDF bank statements
- Auto-categorization + duplicate detection
- Full CSV export anytime

</td>
</tr>
</table>

<br/>

## 📱 Install it in 2 minutes

CurRoute installs like a native app — no App Store, no Play Store, no APK sideloading required.

**iPhone:** Open the link in **Safari** → tap **Share** → **Add to Home Screen**.
**Android:** Open the link in **Chrome** → tap **⋮ menu** → **Add to Home screen / Install app**.

That's it. Full-screen, offline-capable, your own icon.

<br/>

## 🛠 Tech stack

Pure HTML, CSS, and vanilla JavaScript. No framework, no build step, no dependencies to install.

| | |
|---|---|
| **Storage** | `localStorage` (offline-first, zero network required) |
| **Charts** | Hand-built inline SVG |
| **Biometrics** | [WebAuthn](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) platform authenticator |
| **PDF parsing** | [pdf.js](https://mozilla.github.io/pdf.js/), loaded on demand |
| **Currency rates** | [Frankfurter API](https://www.frankfurter.app/) — free, no key |
| **Offline support** | Service Worker, cache-first |
| **Type** | Progressive Web App (installable on iOS & Android) |

<br/>

## 🗂 Project structure

```
curroute/
├── index.html          # The entire app — markup, styles, logic
├── manifest.json        # PWA manifest
├── service-worker.js    # Offline caching
└── icons/                # App icons
```

Open `index.html` directly, or serve the folder with any static host. No `npm install`, ever.

<br/>

## 🔐 Privacy at a glance

| What | Where it lives |
|---|---|
| Transactions & settings | Your device's local storage only |
| PIN | SHA-256 hashed + salted, local only |
| Face ID / Touch ID | Device secure hardware, via WebAuthn |
| Currency conversion | Sends only a currency code + amount — never your data |

There is no account system, no server, and nothing to breach.

<br/>

## 🤝 Collaboration &amp; Contact

Have an idea for scaling this further, spotted a bug, or want to collaborate on something? I'd love to hear from you.

| | |
|---|---|
| 📧 **Email** | [madhav.kartheek18@gmail.com](mailto:madhav.kartheek18@gmail.com) |
| 💼 **LinkedIn** | [linkedin.com/in/madhav-kartheek1811](https://www.linkedin.com/in/madhav-kartheek1811/) |

Specifically reach out if you've got:
- 💡 **Ideas for scaling this** — architecture suggestions, feature directions, or things you'd want in a larger version of this project
- 🐛 **Bugs** — anything that doesn't behave as expected, on any device
- 🤝 **Collaboration interest** — happy to discuss contributing, forking, or building on top of this

<br/>

<div align="center">

## 👋 Let's connect

**CurRoute** was designed and built end-to-end by **Madhav Kartheek Bhumireddi** — if you're into thoughtful product design, privacy-first engineering, or just want to talk shop, I'd genuinely love to connect.

<a href="https://www.linkedin.com/in/madhav-kartheek1811/">
  <img src="https://img.shields.io/badge/-Visit_my_LinkedIn_Profile-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>

<sub>If this project's design or approach resonated with you, a connection request or a share means a lot ⭐</sub>

</div>

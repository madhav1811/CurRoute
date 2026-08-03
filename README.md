# CurRoute

CurRoute is a polished, lightweight daily expense ledger built as a progressive web app (PWA). It helps you track spending, review monthly summaries, and stay in control of your finances with a clean, premium interface.

## ✨ Features

- Daily expense and income tracking
- Monthly summary and budget insights
- Elegant, mobile-friendly UI
- Installable on iPhone, Android, and desktop as a web app
- Local-first experience with offline support via service worker

## 🧩 Project Overview

CurRoute is designed for people who want a simple, beautiful tool for managing personal finances without the complexity of heavy budgeting apps. The app focuses on speed, clarity, and a premium experience.

## 🛠️ Run Locally

You can run the app locally using a simple static server.

### Using Python

```bash
cd /Users/madhav/Downloads/CurRoute
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## 📱 Install on iPhone / iPad

1. Open the app in Safari.
2. Tap the Share button.
3. Choose Add to Home Screen.
4. Tap Add.

## 🚀 Deploy to GitHub Pages

This project is ready to be hosted on GitHub Pages.

1. Push the project to GitHub.
2. Open your repository on GitHub.
3. Go to Settings → Pages.
4. Select the branch to deploy from, usually `main`.
5. Save the settings.

Your app will be available at:

```text
https://YOUR_USERNAME.github.io/REPOSITORY_NAME/
```

## 📁 Project Structure

```text
CurRoute/
├── index.html
├── manifest.json
├── service-worker.js
├── icons/
└── README.md
```

## 💡 Notes

- The app uses a web manifest for installability.
- A service worker enables caching and offline support.
- The interface is optimized for mobile screens and touch interaction.

## 🧾 License

This project is open-source and available for personal and educational use.

# 📖 Quran Sura Introduction Viewer

A premium, modern web application designed to browse and explore the **"Introduction of Sura"** (บทนำซูเราะห์) for all 114 Suras of the Holy Quran. Content is dynamically fetched from **Dorar.net** and translated into **Thai** using AI power.

![Preview](https://img.shields.io/badge/Quran-Introduction-blueviolet?style=for-the-badge)
![AI Translation](https://img.shields.io/badge/AI-Translation-emerald?style=for-the-badge)

## ✨ Features

- 🕋 **Full Sura Support**: Browse introductions for all 114 Suras.
- 🇹🇭 **Dual-Language Tabs**: Instantly switch between the original English and AI-translated Thai content.
- 🎨 **Premium Visuals**: Sleek dark-themed interface with glassmorphism, animated background orbs, and smooth transitions.
- 📌 **Smart Footnotes**: Long reference citations are tucked away into elegant numeric badges. Hover or click to see the full reference in a premium popup.
- 📋 **One-Click Copy**: Copy the content (in the language currently selected) with formatted source links included.
- 🌓 **Semantic Styling**: Retains the original formatting (Prophet's quotes in cyan, Quran verses in emerald) adapted for dark mode.
- 📱 **Fully Responsive**: Optimized for desktop, tablets, and mobile phones.

## 🚀 How it Works

1. **Scraping**: The app fetches raw HTML content from [Dorar.net](https://dorar.net/en/tafseer/) using a CORS proxy.
2. **Parsing**: It extracts the complex nested content, preserving semantic formatting like bold text and specific colors.
3. **Translation**: English content is sent to a custom **Google Apps Script (GAS)** backend that leverages Google's translation engine for high-quality Thai translation.
4. **Rendering**: The processed content is displayed in real-time with local caching for smooth navigation.

## 📂 Project Structure

- `index.html`: Main application interface.
- `style.css`: Modern styling and animations.
- `script.js`: Core logic for fetching, parsing, and tab management.
- `server.js`: Optional local Node.js proxy (for local development).
- `GAS.gs`: Google Apps Script source code for the translation API.
- `start.bat`: Convenience script to start the local proxy and app.

## 🌐 Deployment (GitHub Pages)

This project is ready for **GitHub Pages**. Since it's a static site:
1. Upload all files (excluding `node_modules` and hidden files) to a GitHub repository.
2. Go to **Settings > Pages** and enable deployment from the `main` branch.
3. The app will automatically use **Public CORS Proxies** (like AllOrigins) to fetch data since the local proxy won't be available on GitHub.

## 🛠️ Developer Setup

### Local Setup (Recommended for speed)
1. Install [Node.js](https://nodejs.org/).
2. Run `start.bat` (Windows) or `node server.js` then open `index.html` in your browser.
3. The local proxy bypasses external API limits and provides faster loading.

### Translation API Setup
If you want to use your own Google Apps Script for translation:
1. Create a new script project at [script.google.com](https://script.google.com/).
2. Paste the contents of `GAS.gs`.
3. Deploy as a **Web App**, set access to **"Anyone"**.
4. Copy the Web App URL and update the `GAS_URL` constant in `script.js`.

---

### 🏛️ Credits
- Content Source: [Dorar.net](https://dorar.net/en/tafseer/)
- Icons: Feather Icons & Lucide (SVG)
- Fonts: Google Fonts (Outfit & Amiri)

*Developed for educational purposes and to facilitate the study of Quranic contexts.*

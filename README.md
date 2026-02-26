# 📖 Thai Intro-Summary of Surah Viewer

A premium, modern web application designed for exploring the **"Introduction and Summary"** (บทนำและสรุปซูเราะห์) of all 114 Suras of the Holy Quran. This tool aggregates scholarly content from multiple prestigious sources and provides instant **AI-powered Thai translations**.

![Preview](https://img.shields.io/badge/Quran-Introduction-blueviolet?style=for-the-badge)
![AI Translation](https://img.shields.io/badge/AI-Translation-emerald?style=for-the-badge)
![Multi Source](https://img.shields.io/badge/Sources-Multi--Tafseer-orange?style=for-the-badge)

## ✨ Features

- 🕋 **Multi-Source Support**: 
  - **Quran.com (Ibn Ashur)**: Deep structural and thematic insights.
  - **Quran.com (A. Maududi)**: Comprehensive historical and contextual background.
  - **Dorar.net**: Concise and scholarly introductions.
- 🇹🇭 **Dual-Language Tabs**: Seamlessly toggle between the original **English** text and the localized **Thai** translation.
- 🤖 **Instant AI Translation**: English content is dynamically translated using a custom Google Apps Script backend.
- 🎨 **Premium Modern UI**: 
  - Sleek **Dark Mode** by default.
  - **Glassmorphism** effects and interactive elements.
  - **Animated Background Orbs** for a premium visual experience.
  - **Smooth Transitions** and micro-animations.
- 📋 **Smart Copy System**: One-click to copy content (in the selected language) with full source attribution and links.
- 📱 **Adaptive & Responsive**: Fully optimized for Desktop, Tablets, and Mobile devices.
- 🌓 **Semantic Formatting**: Retains meaningful styling (Prophet's quotes in cyan, Quran verses in emerald) adapted for readability.

## 🚀 Technical Architecture

1.  **Client-Side (Frontend)**: Built with Vanilla HTML5, CSS3 (Modern features), and JavaScript.
2.  **CORS Proxy Engine**: Uses a prioritized proxy system (Local Node.js → Public CORS Proxies) to fetch content from external sources without restrictions.
3.  **Translation Pipeline**:
    - Extracted English HTML is sent to a **Google Apps Script (GAS)** Web App.
    - The GAS backend handles the translation using Google's translation engine.
    - Returns sanitized HTML to ensure safety and consistent styling.
4.  **Local Development**: Includes a `server.js` Node.js proxy for faster, more reliable fetching during development.

## 📂 Project Structure

- `index.html`: The core application structure.
- `style.css`: Comprehensive design system, animations, and typography.
- `script.js`: Complex logic for fetching, parsing multiple sources, and state management.
- `server.js`: Node.js proxy server for local development.
- `GAS.gs`: Backend script for the translation API.
- `start.bat`: One-click launcher for Windows users.

## 🌐 Deployment

### GitHub Pages / Vercel
The project is optimized for static hosting providers.
1.  Push the files to your repository.
2.  It automatically detects environment and switches to **Public Proxies** (AllOrigins, etc.) if not running locally.

## 🛠️ Developer Setup

### 1. Local Development
Recommended for the best experience:
1.  Install [Node.js](https://nodejs.org/).
2.  Run `npm install express cors` (if not already set up).
3.  Execute `start.bat` or run `node server.js`.
4.  Open `index.html` in your browser.

### 2. Custom Translation API
To host your own translation backend:
1.  Copy `GAS.gs` to a new [Google Apps Script](https://script.google.com/) project.
2.  Deploy as **Web App** (Execute as "Me", Access "Anyone").
3.  Update the `GAS_URL` constant in `script.js` with your new endpoint.

---

### 🏛️ Credits & Resources
- **Data Sources**: [Dorar.net](https://dorar.net/en/tafseer/), [Quran.com](https://quran.com)
- **Design Inspiration**: Modern Minimalist & Islamic Aesthetics
- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit) & [Amiri](https://fonts.google.com/specimen/Amiri)

Developed with ❤️ to facilitate a deeper understanding of the Quranic context for the Thai-speaking Ummah.  
**© Copyright, 2026 · Tech for Ummah**

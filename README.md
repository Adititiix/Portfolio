# 🚀 Aditi S — Portfolio Website

A premium, animated personal portfolio built with React + Vite + Tailwind CSS + Framer Motion.

## ✨ Features

- **Custom cursor** with smooth lag effect
- **Animated loading screen** with morphing blob
- **Scroll progress bar** at the top
- **Text scramble animations** on hero
- **Blob-framed profile photo** with rotating rings
- **Scroll-triggered section reveals**
- **Interactive project cards** with expand modal
- **Floating animated stickers**
- **Marquee ticker strip**
- **Easter egg** — Press `?` on keyboard!
- **Magnetic buttons** with hover states
- **Fully responsive** — mobile, tablet, desktop

## 🛠️ Tech Stack

- React 18 + Vite
- Tailwind CSS 3
- Framer Motion 11
- Google Fonts (Bebas Neue, DM Sans, Space Mono)

## ▶️ Running Locally

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

## 📦 Building for Production

```bash
npm run build
npm run preview
```

## 🌐 Deploying on Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy** ✅

Or use Vercel CLI:
```bash
npx vercel
```

## 📁 Project Structure

```
aditi-portfolio/
├── public/
│   ├── aditi.jpg          # Profile photo
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx
│   │   ├── Cursor.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Achievements.jsx
│   │   ├── WhyHireMe.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── EasterEgg.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Customization

- Edit content directly in each component file
- Colors defined as CSS variables in `src/index.css`
- Replace `public/aditi.jpg` with updated photo
- Update links in `Contact.jsx` and `Navbar.jsx`

---

Designed to be remembered. Built by Aditi S.

# Finlogue

A premium, institutional-grade web portfolio and venture syndicate platform. Designed with a sleek, high-end "Cohere" aesthetic to showcase offerings, portfolio startups, esteemed investors, and dynamic partnership funnels.

## 🚀 Features

- **Premium Aesthetics:** Clean, minimalist UI with a signature Navy & Gold (`--color-coral`) accent palette, glassmorphic headers, and subtle hairline borders.
- **Micro-Animations:** Fluid, scroll-linked ambient background orbs and seamless section transitions powered by `framer-motion`.
- **Dynamic Routing:** Multi-page Single Page Application (SPA) architecture utilizing `react-router-dom` for instantaneous navigation between the core portfolio and partnership funnels.
- **"Stealth" Google Forms Integration:** A custom-built, perfectly styled React form that seamlessly proxies submissions directly into a secure university Google Spreadsheet bypassing strict enterprise workspace restrictions.
- **Responsive Architecture:** Fully fluid layout adapting beautifully from ultra-wide desktop monitors down to mobile devices with a custom animated hamburger menu.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** Vanilla CSS3 (Custom Properties / Design Tokens)
- **Routing:** React Router v7
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📦 Setup & Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Roodraksh12/Finlogue.git
   cd Finlogue
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

## 📂 Project Structure

```text
Finlogue/
├── public/                 # Static assets (images, icons, redirects)
│   ├── investors/          # Investor profile headshots
│   └── _redirects          # Netlify routing configuration
├── src/
│   ├── components/         # Reusable UI sections (Hero, About, Portfolio, etc.)
│   ├── pages/              # Top-level page views (HomePage, PartnerPage)
│   ├── App.jsx             # Main router and layout wrapper
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles and design system variables
├── package.json            # Project metadata and dependencies
└── vercel.json             # Vercel deployment configuration
```

## 🌐 Deployment

This project is configured for out-of-the-box deployment on platforms like **Vercel** or **Netlify**.
- **Vercel:** Auto-detects the Vite configuration. Simply import the GitHub repository.
- **Netlify:** The `public/_redirects` file is already included to ensure React Router paths don't return 404 errors on refresh.

## 🤝 Contributing

This project is tailored specifically for the Finlogue syndicate. For internal team members:
1. Ensure new sections follow the global CSS variable tokens in `index.css`.
2. Do not use inline styles; create a corresponding `.css` module for new components.
3. Test layout changes across both desktop and mobile viewports.

---
*Built with React & Vite. Designed for Finlogue.*

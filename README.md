# 💰 FinanceApp

A clean, minimal personal finance tracker built with React, Tailwind CSS, and Recharts. Track income, expenses, budgets, and spending trends — all in a sleek black & white UI.

---

## 🚀 Tech Stack

- **React** + **Vite**
- **React Router DOM** — client-side routing
- **React Hook Form** — form validation
- **Recharts** — charts and data visualization
- **React Toastify** — toast notifications
- **Tailwind CSS** — styling
- **UUID** — unique transaction IDs

---

## 📦 Installation
```bash
npm create vite@latest finance-app -- --template react
cd finance-app
npm install
npm install react-router-dom react-hook-form recharts uuid react-toastify
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```js
content: ["./index.html", "./src/**/*.{js,jsx}"],
```

Replace `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🗂️ Project Structure
```
src/
├── context/
│   └── FinanceContext.jsx   # Global state (transactions, budget) + localStorage persistence
├── pages/
│   ├── Dashboard.jsx        # Overview, pie chart, budget bar, recent transactions
│   ├── Transactions.jsx     # List with search, filter, sort, delete
│   ├── AddTransaction.jsx   # Form with React Hook Form validation
│   ├── Budget.jsx           # Set budget, progress bar, category breakdown
│   └── Analytics.jsx        # Bar, line, and pie charts
└── App.jsx                  # Routing + navbar
```

---

## ✨ Features

| Feature | Status |
|---|---|
| Dashboard with stats + pie chart + budget bar | ✅ |
| Transactions list with search, filter, sort, delete | ✅ |
| Add Transaction form with validation | ✅ |
| Budget page with progress bar + warning at 90% | ✅ |
| Analytics with bar, line & pie charts | ✅ |
| React Router DOM routing | ✅ |
| React Hook Form + Toastify | ✅ |
| Recurring transaction badge | ✅ |
| localStorage persistence (data survives refresh) | ✅ |
| Clean black & white Tailwind UI | ✅ |

---

## ▶️ Running the App
```bash
npm run dev
```

App runs at `http://localhost:5173` by default.

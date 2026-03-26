# 💰 FinanceApp

A clean, minimal personal finance tracker built with React, Tailwind CSS, and Recharts. Track income, expenses, budgets, and spending trends — all in a slick black & white UI.

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
npm install react-router-dom axios react-hook-form recharts uuid react-toastify
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**`tailwind.config.js`** — update the `content` field:

```js
content: ["./index.html", "./src/**/*.{js,jsx}"],
```

**`src/index.css`** — replace everything with:

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
│   └── FinanceContext.jsx   # Global state (transactions, budget)
├── pages/
│   ├── Dashboard.jsx        # Overview, pie chart, budget bar
│   ├── Transactions.jsx     # List with search, filter, sort, delete
│   ├── AddTransaction.jsx   # Form to add income/expense
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
| Budget page with progress bar + breakdown | ✅ |
| Analytics with bar, line & pie charts | ✅ |
| Context API global state | ✅ |
| React Router DOM routing | ✅ |
| React Hook Form + Toastify | ✅ |
| Recurring transaction badge | ✅ |
| Clean black & white Tailwind UI | ✅ |

---

## 📄 Pages

### 🏠 Dashboard (`/dashboard`)
- Summary cards: Total Income, Total Expenses, Net Balance, Top Category
- Pie chart — spending by category
- Budget progress bar
- Recent 5 transactions

### 📋 Transactions (`/transactions`)
- Full transaction list
- Search by title or notes
- Filter by category and type (income/expense)
- Sort by date, amount, or category
- Delete transactions
- Recurring badge indicator

### ➕ Add Transaction (`/transactions/new`)
- Toggle between income and expense
- Fields: Title, Amount, Category, Date, Notes
- Mark as recurring checkbox
- Form validation with error messages

### 💼 Budget (`/budget`)
- Set and update monthly budget
- Visual progress bar with warning at 90%
- Spending breakdown by category

### 📊 Analytics (`/analytics`)
- Bar chart — Income vs Expense
- Line chart — Spending trend over time
- Pie chart — Expense breakdown by category

---

## ▶️ Running the App

```bash
npm run dev
```

App runs at `http://localhost:5173` by default.

---

## 📝 Notes

- All data is stored in-memory via React Context — refreshing the page resets to sample data.
- To add persistence, integrate `localStorage` in `FinanceContext.jsx` using `useEffect`.
- Sample transactions are pre-loaded in INR (₹) for demonstration.
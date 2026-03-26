import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Budget from "./pages/Budget";
import Analytics from "./pages/Analytics";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/transactions/new", label: "+ Add" },
  { to: "/budget", label: "Budget" },
  { to: "/analytics", label: "Analytics" },
];

export default function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white text-black">
          {/* Navbar */}
          <nav className="border-b border-black px-6 py-3 flex gap-6 items-center flex-wrap">
            <span className="font-bold text-lg mr-4">💰 FinanceApp</span>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-1 border border-black rounded transition-all ${isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Pages */}
          <main className="max-w-5xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/new" element={<AddTransaction />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </FinanceProvider>
  );
}
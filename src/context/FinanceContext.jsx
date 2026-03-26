import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // 1. Initial Dummy Data (to show when the app is brand new)
  const defaultData = [
    { id: uuidv4(), title: "Salary", amount: 50000, category: "Income", type: "income", date: "2025-03-01", notes: "", recurring: false },
    { id: uuidv4(), title: "Rent", amount: 12000, category: "Rent", type: "expense", date: "2025-03-02", notes: "Monthly rent", recurring: true },
    { id: uuidv4(), title: "Netflix", amount: 649, category: "Subscriptions", type: "expense", date: "2025-03-03", notes: "", recurring: true },
    { id: uuidv4(), title: "Groceries", amount: 3200, category: "Food", type: "expense", date: "2025-03-05", notes: "", recurring: false },
    { id: uuidv4(), title: "Gym", amount: 1500, category: "Health", type: "expense", date: "2025-03-06", notes: "", recurring: true },
    { id: uuidv4(), title: "Freelance", amount: 15000, category: "Income", type: "income", date: "2025-03-10", notes: "", recurring: false },
    { id: uuidv4(), title: "Shopping", amount: 4500, category: "Shopping", type: "expense", date: "2025-03-12", notes: "", recurring: false },
    { id: uuidv4(), title: "Travel", amount: 2000, category: "Travel", type: "expense", date: "2025-03-15", notes: "Cab fares", recurring: false },
  ];

  // 2. Load Transactions from Local Storage or use defaults
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("finance_transactions");
    return saved ? JSON.parse(saved) : defaultData;
  });

  // 3. Load Budget from Local Storage or use default 50000
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("finance_budget");
    return savedBudget ? JSON.parse(savedBudget) : 50000;
  });

  // 4. Update Local Storage whenever transactions change
  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 5. Update Local Storage whenever budget changes
  useEffect(() => {
    localStorage.setItem("finance_budget", JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (t) => setTransactions(prev => [{ ...t, id: uuidv4() }, ...prev]);
  const deleteTransaction = (id) => setTransactions(prev => prev.filter(t => t.id !== id));
  const updateTransaction = (id, updated) => setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, deleteTransaction, updateTransaction, budget, setBudget }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([
    { id: uuidv4(), title: "Salary", amount: 50000, category: "Income", type: "income", date: "2025-03-01", notes: "", recurring: false },
    { id: uuidv4(), title: "Rent", amount: 12000, category: "Rent", type: "expense", date: "2025-03-02", notes: "Monthly rent", recurring: true },
    { id: uuidv4(), title: "Netflix", amount: 649, category: "Subscriptions", type: "expense", date: "2025-03-03", notes: "", recurring: true },
    { id: uuidv4(), title: "Groceries", amount: 3200, category: "Food", type: "expense", date: "2025-03-05", notes: "", recurring: false },
    { id: uuidv4(), title: "Gym", amount: 1500, category: "Health", type: "expense", date: "2025-03-06", notes: "", recurring: true },
    { id: uuidv4(), title: "Freelance", amount: 15000, category: "Income", type: "income", date: "2025-03-10", notes: "", recurring: false },
    { id: uuidv4(), title: "Shopping", amount: 4500, category: "Shopping", type: "expense", date: "2025-03-12", notes: "", recurring: false },
    { id: uuidv4(), title: "Travel", amount: 2000, category: "Travel", type: "expense", date: "2025-03-15", notes: "Cab fares", recurring: false },
  ]);
  const [budget, setBudget] = useState(50000);

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
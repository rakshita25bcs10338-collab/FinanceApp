import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // 1. No Default Data
  const defaultData = [];

  // 2. Load Transactions from Local Storage or use empty array
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("finance_transactions");
    return saved ? JSON.parse(saved) : defaultData;
  });

  // 3. Load Budget from Local Storage or use default 0 (or keep 50000 if you want)
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("finance_budget");
    return savedBudget ? JSON.parse(savedBudget) : 0;
  });

  // 4. Update Local Storage whenever transactions change
  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 5. Update Local Storage whenever budget changes
  useEffect(() => {
    localStorage.setItem("finance_budget", JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (t) =>
    setTransactions((prev) => [{ ...t, id: uuidv4() }, ...prev]);

  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  const updateTransaction = (id, updated) =>
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        budget,
        setBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
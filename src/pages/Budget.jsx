import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { toast } from "react-toastify";

export default function Budget() {
  const { budget, setBudget, transactions } = useFinance();
  const [input, setInput] = useState(budget);

  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const remaining = budget - totalExpense;
  const percent = Math.min(Math.round((totalExpense / budget) * 100), 100);

  const categoryBreakdown = Object.entries(
    transactions.filter(t => t.type === "expense").reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  const handleSave = () => {
    setBudget(parseFloat(input));
    toast.success("Budget updated!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Budget</h1>

      {/* Set Budget */}
      <div className="border border-black rounded p-6 mb-6">
        <h2 className="font-semibold mb-3">Set Monthly Budget</h2>
        <div className="flex gap-3">
          <input
            type="number"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="border border-black rounded px-3 py-2 text-sm flex-1"
            placeholder="Enter budget"
          />
          <button onClick={handleSave} className="bg-black text-white px-4 py-2 rounded text-sm hover:opacity-80">Save</button>
        </div>
      </div>

      {/* Progress */}
      <div className="border border-black rounded p-6 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Spent: ₹{totalExpense.toLocaleString()}</span>
          <span>Budget: ₹{budget.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded h-5">
          <div className={`h-5 rounded transition-all ${percent >= 90 ? "bg-gray-800" : "bg-black"}`} style={{ width: `${percent}%` }} />
        </div>
        <div className="flex justify-between text-xs mt-2 text-gray-500">
          <span>{percent}% used</span>
          <span>Remaining: ₹{remaining.toLocaleString()}</span>
        </div>
        {percent >= 90 && <p className="text-sm font-medium mt-3 border border-black rounded px-3 py-2">⚠️ Warning: You've used {percent}% of your budget!</p>}
      </div>

      {/* Category Breakdown */}
      <div className="border border-black rounded p-6">
        <h2 className="font-semibold mb-3">Spending by Category</h2>
        {categoryBreakdown.map(([cat, amt]) => (
          <div key={cat} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm">{cat}</span>
            <span className="text-sm font-medium">₹{amt.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
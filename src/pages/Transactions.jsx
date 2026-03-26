import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { toast } from "react-toastify";

const CATEGORIES = ["All", "Food", "Travel", "Rent", "Shopping", "Entertainment", "Health", "Utilities", "Subscriptions", "Income"];

export default function Transactions() {
  const { transactions, deleteTransaction } = useFinance();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filtered = transactions
    .filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.notes.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || t.category === category;
      const matchType = typeFilter === "all" || t.type === typeFilter;
      return matchSearch && matchCat && matchType;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return 0;
    });

  const handleDelete = (id) => {
    deleteTransaction(id);
    toast.success("Transaction deleted");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title or notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-black rounded px-3 py-2 text-sm flex-1 min-w-48"
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border border-black rounded px-3 py-2 text-sm">
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border border-black rounded px-3 py-2 text-sm">
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-black rounded px-3 py-2 text-sm">
          <option value="date">Sort: Date</option>
          <option value="amount">Sort: Amount</option>
          <option value="category">Sort: Category</option>
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-12">No transactions found.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map(t => (
            <div key={t.id} className={`border rounded p-4 flex justify-between items-center ${t.recurring ? "border-black" : "border-gray-300"}`}>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{t.title}</p>
                  {t.recurring && <span className="text-xs border border-black px-1 rounded">Recurring</span>}
                </div>
                <p className="text-xs text-gray-400">{t.category} · {t.date}</p>
                {t.notes && <p className="text-xs text-gray-400 mt-1">{t.notes}</p>}
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${t.type === "income" ? "text-black" : "text-gray-500"}`}>
                  {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
                </span>
                <button onClick={() => handleDelete(t.id)} className="text-xs border border-black px-2 py-1 rounded hover:bg-black hover:text-white transition-all">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
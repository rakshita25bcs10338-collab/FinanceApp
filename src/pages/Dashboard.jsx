import { useFinance } from "../context/FinanceContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#000", "#444", "#888", "#aaa", "#ccc", "#333", "#666", "#999"];

export default function Dashboard() {
  const { transactions, budget } = useFinance();

  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const categoryData = Object.entries(
    transactions.filter(t => t.type === "expense").reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const topCategory = categoryData.sort((a, b) => b.value - a.value)[0];

  const stats = [
    { label: "Total Income", value: `₹${totalIncome.toLocaleString()}` },
    { label: "Total Expenses", value: `₹${totalExpense.toLocaleString()}` },
    { label: "Net Balance", value: `₹${balance.toLocaleString()}` },
    { label: "Top Category", value: topCategory?.name || "—" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="border border-black rounded p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="border border-black rounded p-4">
        <h2 className="font-semibold mb-4">Spending by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name }) => name}>
              {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Summary */}
      <div className="border border-black rounded p-4 mt-4">
        <h2 className="font-semibold mb-2">Budget Overview</h2>
        <p className="text-sm mb-2">Monthly Budget: ₹{budget.toLocaleString()} | Spent: ₹{totalExpense.toLocaleString()} | Remaining: ₹{(budget - totalExpense).toLocaleString()}</p>
        <div className="w-full bg-gray-200 rounded h-4">
          <div
            className="bg-black h-4 rounded transition-all"
            style={{ width: `${Math.min((totalExpense / budget) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs mt-1 text-gray-500">{Math.min(Math.round((totalExpense / budget) * 100), 100)}% used</p>
      </div>

      {/* Recent Transactions */}
      <div className="border border-black rounded p-4 mt-4">
        <h2 className="font-semibold mb-3">Recent Transactions</h2>
        {transactions.slice(0, 5).map(t => (
          <div key={t.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <div>
              <p className="font-medium text-sm">{t.title}</p>
              <p className="text-xs text-gray-400">{t.category} · {t.date}</p>
            </div>
            <span className={`font-bold text-sm ${t.type === "income" ? "text-black" : "text-gray-600"}`}>
              {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
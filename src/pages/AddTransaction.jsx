import { useForm } from "react-hook-form";
import { useFinance } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CATEGORIES = ["Food", "Travel", "Rent", "Shopping", "Entertainment", "Health", "Utilities", "Subscriptions"];

export default function AddTransaction() {
  const { addTransaction } = useFinance();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: { type: "expense", date: new Date().toISOString().split("T")[0], recurring: false }
  });

  const type = watch("type");

  const onSubmit = (data) => {
    addTransaction({ ...data, amount: parseFloat(data.amount), recurring: !!data.recurring });
    toast.success("Transaction added!");
    navigate("/transactions");
  };

  const inputClass = "w-full border border-black rounded px-3 py-2 text-sm mt-1";
  const errorClass = "text-xs text-red-600 mt-1";

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border border-black rounded p-6 space-y-4">

        {/* Type Toggle */}
        <div className="flex gap-3">
          {["income", "expense"].map(t => (
            <label key={t} className={`flex-1 text-center py-2 border border-black rounded cursor-pointer capitalize text-sm ${type === t ? "bg-black text-white" : ""}`}>
              <input type="radio" value={t} {...register("type")} className="hidden" />
              {t}
            </label>
          ))}
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-medium">Title *</label>
          <input {...register("title", { required: "Title is required" })} className={inputClass} placeholder="e.g. Netflix" />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium">Amount (₹) *</label>
          <input type="number" {...register("amount", { required: "Amount is required", min: { value: 1, message: "Must be > 0" } })} className={inputClass} placeholder="0" />
          {errors.amount && <p className={errorClass}>{errors.amount.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium">Category *</label>
          <select {...register("category", { required: "Category is required" })} className={inputClass}>
            <option value="">Select category</option>
            {(type === "income" ? ["Salary", "Freelance", "Business", "Other"] : CATEGORIES).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium">Date *</label>
          <input type="date" {...register("date", { required: "Date is required" })} className={inputClass} />
          {errors.date && <p className={errorClass}>{errors.date.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium">Notes</label>
          <textarea {...register("notes")} className={inputClass} rows={2} placeholder="Optional notes..." />
        </div>

        {/* Recurring */}
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" {...register("recurring")} className="w-4 h-4" />
          Mark as Recurring
        </label>

        <button type="submit" className="w-full bg-black text-white py-2 rounded font-medium hover:opacity-80 transition-all">
          Add Transaction
        </button>
      </form>
    </div>
  );
}
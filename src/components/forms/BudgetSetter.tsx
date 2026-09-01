import { useState } from "react";
import { useExpenseStore } from "../../store/expenseStore";
import { CATEGORIES, CATEGORY_COLORS } from "../../types";
import { formatRupiah } from "../../utils/format";

export const BudgetSetter = () => {
  const { budgets, setBudget, expenses } = useExpenseStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);
  const [limit, setLimit] = useState<number>(0);

  const handleSetBudget = () => {
    if (limit > 0) {
      setBudget(selectedCategory, limit);
      setLimit(0); // Reset input setelah set
    }
  };

  // Hitung pengeluaran per kategori
  const getSpentByCategory = (category: string) => {
    return expenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Set Budget Bulanan</h2>
      
      {/* Form Set Budget */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Limit (Rp)"
          value={limit || ""}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSetBudget}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Set Budget
        </button>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        {budgets.map((budget) => {
          const spent = getSpentByCategory(budget.category);
          const percentage = Math.min((spent / budget.limit) * 100, 100);
          const isOver = spent > budget.limit;
          
          // Warna progress bar: hijau (<70%), kuning (70-90%), merah (>90%)
          let barColor = "bg-green-500";
          if (percentage >= 90) barColor = "bg-red-500";
          else if (percentage >= 70) barColor = "bg-yellow-500";

          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[budget.category] }}
                  />
                  <span className="font-medium text-gray-700">{budget.category}</span>
                </div>
                <span className={`text-sm font-semibold ${isOver ? "text-red-500" : "text-gray-600"}`}>
                  {formatRupiah(spent)} / {formatRupiah(budget.limit)}
                  {isOver && " ⚠️ Over!"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${barColor} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 text-right">
                {percentage.toFixed(0)}% terpakai
              </p>
            </div>
          );
        })}
        {budgets.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-4">
            Belum ada budget yang diset. Set budget di atas untuk mulai tracking!
          </p>
        )}
      </div>
    </div>
  );
};
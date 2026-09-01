import { useExpenseStore } from "../store/expenseStore";
import { formatRupiah, formatDate } from "../utils/format";
import { Trash2 } from "lucide-react"; // Icon tempat sampah

export const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenseStore();

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Belum ada pengeluaran. Yuk mulai catat!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        Riwayat Pengeluaran
      </h2>
      
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200 gap-3 sm:gap-0"
          >
            {/* Info Pengeluaran */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                  {expense.category}
                </span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {formatDate(expense.date)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {expense.description}
              </p>
            </div>

            {/* Nominal & Tombol Hapus */}
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
              <span className="font-bold text-red-500 text-sm sm:text-lg whitespace-nowrap">
                - {formatRupiah(expense.amount)}
              </span>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition flex-shrink-0"
                title="Hapus"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
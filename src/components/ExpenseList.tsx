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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Riwayat Pengeluaran</h2>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
          >
            {/* Info Pengeluaran */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{expense.category}</span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {formatDate(expense.date)}
                </span>
              </div>
              <p className="text-sm text-gray-500">{expense.description}</p>
            </div>

            {/* Nominal & Tombol Hapus */}
            <div className="flex items-center gap-4">
              <span className="font-bold text-red-500 text-lg">
                - {formatRupiah(expense.amount)}
              </span>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
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
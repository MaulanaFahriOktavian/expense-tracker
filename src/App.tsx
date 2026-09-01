import { AddExpenseForm } from "./components/forms/AddExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { CategoryPieChart } from "./components/charts/CategoryPieChart"; // <-- Tambahkan import ini
import { useExpenseStore } from "./store/expenseStore";
import { formatRupiah } from "./utils/format";
import { Wallet, TrendingDown } from "lucide-react";

function App() {
  const { getTotalExpenses, expenses } = useExpenseStore();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Aplikasi */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Wallet className="text-blue-600" size={40} />
            Expense Tracker
          </h1>
          <p className="text-gray-500 mt-2">Kelola keuanganmu dengan lebih bijak</p>
        </header>

        {/* Kartu Ringkasan (Summary Card) */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl mb-8 flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Total Pengeluaran</p>
            <h2 className="text-4xl font-bold mt-2">{formatRupiah(getTotalExpenses())}</h2>
            <p className="text-blue-200 text-sm mt-2 flex items-center gap-1">
              <TrendingDown size={16} />
              {expenses.length} Transaksi tercatat
            </p>
          </div>
          <Wallet size={80} className="text-blue-400 opacity-50" />
        </div>

        {/* Grid Layout: Form di kiri, List di kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Kolom Kiri: Form Input */}
          <div className="lg:col-span-1">
            <AddExpenseForm />
          </div>

          {/* Kolom Kanan: Daftar Pengeluaran */}
          <div className="lg:col-span-2">
            <ExpenseList />
          </div>
        </div>

        {/* BARIS BARU: Tambahkan Grafik di Bagian Bawah */}
        <div className="mb-8">
          <CategoryPieChart />
        </div>

      </div>
    </div>
  );
}

export default App;
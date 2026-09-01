import { AddExpenseForm } from "./components/forms/AddExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { BudgetSetter } from "./components/forms/BudgetSetter";
import { CategoryPieChart } from "./components/charts/CategoryPieChart";
import { DailyTrendChart } from "./components/charts/DailyTrendChart";
import { DarkModeToggle } from "./components/DarkModeToggle"; // <-- IMPORT BARU
import { useExpenseStore } from "./store/expenseStore";
import { formatRupiah, exportToCSV } from "./utils/format";
import { Wallet, TrendingDown, Download } from "lucide-react";

function App() {
  const { getTotalExpenses, expenses } = useExpenseStore();

  const handleExport = () => {
    exportToCSV(expenses);
  };

  return (
    // TAMBAHKAN class "dark:bg-gray-900" dan "dark:text-white" di sini
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-4 sm:py-8 px-3 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Dengan Tombol Export & Dark Mode */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                <Wallet className="text-blue-600 flex-shrink-0" size={32} />
                Expense Tracker
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                Kelola keuanganmu dengan lebih bijak
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                disabled={expenses.length === 0}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition shadow-sm ${
                  expenses.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md"
                }`}
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </button>
              
              {/* TOMBOL DARK MODE */}
              <DarkModeToggle />
            </div>
          </div>
        </header>

        {/* Kartu Ringkasan - Tambahkan dark mode classes */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white shadow-xl mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-blue-100 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Total Pengeluaran
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-1 sm:mt-2">
                {formatRupiah(getTotalExpenses())}
              </h2>
              <p className="text-blue-200 text-xs sm:text-sm mt-2 flex items-center justify-center sm:justify-start gap-1">
                <TrendingDown size={14} />
                {expenses.length} Transaksi tercatat
              </p>
            </div>
            <Wallet size={60} className="text-blue-400 opacity-50 flex-shrink-0 hidden sm:block" />
          </div>
        </div>

        <BudgetSetter />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="lg:col-span-1">
            <AddExpenseForm />
          </div>
          <div className="lg:col-span-2">
            <ExpenseList />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <CategoryPieChart />
          <DailyTrendChart />
        </div>

      </div>
    </div>
  );
}

export default App;
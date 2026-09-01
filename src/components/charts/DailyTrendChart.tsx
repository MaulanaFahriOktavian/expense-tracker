import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useExpenseStore } from "../../store/expenseStore";
import { formatRupiah } from "../../utils/format";
import { format, subDays } from "date-fns";
import { id } from "date-fns/locale";

export const DailyTrendChart = () => {
  const expenses = useExpenseStore((state) => state.expenses);

  // Generate 7 hari terakhir
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, "yyyy-MM-dd");
    const label = format(date, "dd MMM", { locale: id });
    
    // Hitung total pengeluaran per hari
    const total = expenses
      .filter((exp) => exp.date === dateStr)
      .reduce((sum, exp) => sum + exp.amount, 0);

    return { date: label, total };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Tren Pengeluaran 7 Hari Terakhir</h2>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={last7Days}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value: number) => formatRupiah(value)}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
          />
          <Bar dataKey="total" fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
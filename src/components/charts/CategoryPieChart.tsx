import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useExpenseStore } from "../../store/expenseStore";
import { formatRupiah } from "../../utils/format";

export const CategoryPieChart = () => {
  // Ambil expenses dan budgets langsung, bukan memanggil getter function
  const expenses = useExpenseStore((state) => state.expenses);
  
  // Olah data di dalam komponen, bukan di selector
  const data = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Transform ke format yang dibutuhkan Recharts
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    color: 
      {
        Makanan: "#FF6384",
        Transportasi: "#36A2EB",
        Hiburan: "#FFCE56",
        Belanja: "#4BC0C0",
        Tagihan: "#9966FF",
        Kesehatan: "#FF9F40",
        Pendidikan: "#C9CBCF",
        Lainnya: "#7BC8A4",
      }[name] || "#999999",
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Belum ada data untuk ditampilkan dalam grafik. Yuk tambah pengeluaran!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Distribusi Pengeluaran per Kategori</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => formatRupiah(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
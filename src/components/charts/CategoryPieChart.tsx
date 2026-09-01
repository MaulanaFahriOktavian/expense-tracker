import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useExpenseStore } from "../../store/expenseStore";
import { formatRupiah } from "../../utils/format";

export const CategoryPieChart = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  
  const data = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

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
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500 text-sm">Belum ada data untuk ditampilkan dalam grafik. Yuk tambah pengeluaran!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
        Distribusi Pengeluaran per Kategori
      </h2>
      
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => formatRupiah(Number(value))} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
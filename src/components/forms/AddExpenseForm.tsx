import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useExpenseStore } from "../../store/expenseStore";
import { CATEGORIES } from "../../types";

// Skema Validasi
const expenseSchema = z.object({
  amount: z.coerce.number().positive("Nominal harus lebih dari 0"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  description: z.string().min(3, "Deskripsi minimal 3 karakter"),
  date: z.string().min(1, "Tanggal wajib diisi"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export const AddExpenseForm = () => {
  const addExpense = useExpenseStore((state) => state.addExpense);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: ExpenseFormData) => {
    addExpense({
      amount: data.amount,
      category: data.category,
      description: data.description,
      date: data.date,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Pengeluaran</h2>

      {/* Input Nominal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nominal (Rp)</label>
        <input
          type="number"
          {...register("amount")}
          placeholder="Contoh: 25000"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
      </div>

      {/* Input Kategori */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <select
          {...register("category")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
        >
          <option value="">Pilih Kategori</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
      </div>

      {/* Input Deskripsi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
        <input
          type="text"
          {...register("description")}
          placeholder="Contoh: Makan siang di warteg"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      {/* Input Tanggal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
        <input
          type="date"
          {...register("date")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        Simpan Pengeluaran
      </button>
    </form>
  );
};
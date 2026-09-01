import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CATEGORY_COLORS } from "../types";
import type { Expense, Budget } from "../types";
import { generateId } from "../utils/format";

// Definisikan "bentuk" dari store kita
interface ExpenseStore {
  // --- DATA ---
  expenses: Expense[];
  budgets: Budget[];

  // --- AKSI (Actions) ---
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  setBudget: (category: string, limit: number) => void;

  // --- GETTERS (Mengambil data yang sudah diolah) ---
  getTotalExpenses: () => number;
  getTotalBudget: () => number;
  getExpensesByCategory: () => { name: string; value: number; color: string }[];
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      // --- DATA AWAL ---
      expenses: [],
      budgets: [],

      // --- AKSI ---
      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            { ...expense, id: generateId() },
            ...state.expenses, // Item baru ditaruh paling atas (terbaru)
          ],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((exp) => exp.id !== id),
        })),

      setBudget: (category, limit) =>
        set((state) => {
          const existingIndex = state.budgets.findIndex(
            (b) => b.category === category
          );

          if (existingIndex >= 0) {
            // Update budget yang sudah ada
            const updatedBudgets = [...state.budgets];
            updatedBudgets[existingIndex] = { category, limit };
            return { budgets: updatedBudgets };
          }

          // Tambah budget baru
          return {
            budgets: [...state.budgets, { category, limit }],
          };
        }),

      // --- GETTERS ---
      getTotalExpenses: () => {
        return get().expenses.reduce((sum, exp) => sum + exp.amount, 0);
      },

      getTotalBudget: () => {
        return get().budgets.reduce((sum, b) => sum + b.limit, 0);
      },

      getExpensesByCategory: () => {
        const { expenses } = get();
        const categoryMap: Record<string, number> = {};

        // Kelompokkan total pengeluaran berdasarkan kategori
        expenses.forEach((exp) => {
          categoryMap[exp.category] =
            (categoryMap[exp.category] || 0) + exp.amount;
        });

        // Ubah ke format array yang siap dipakai oleh Recharts
        return Object.entries(categoryMap).map(([name, value]) => ({
          name,
          value,
          // Ambil warna dari CATEGORY_COLORS, fallback ke abu-abu jika tidak ketemu
          color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS] || "#999999",
        }));
      },
    }),
    {
      name: "expense-tracker-storage", // Key unik untuk LocalStorage
    }
  )
);
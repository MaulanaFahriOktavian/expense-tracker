// Tipe data untuk setiap pengeluaran
export interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string; // Format: "2025-01-15"
}

// Tipe data untuk budget per kategori
export interface Budget {
    category: string;
    limit: number;
}

// Daftar kategori yang tersedia di aplikasi
export const CATEGORIES = [
    "Makanan",
    "Transportasi",
    "Hiburan",
    "Belanja",
    "Tagihan",
    "Kesehatan",
    "Pendidikan",
    "Lainnya",
] as const;

// Warna untuk setiap kategori (nanti dipakai di chart)
export const CATEGORY_COLORS: Record<string, string> = {
    Makanan: "#FF6384",
    Transportasi: "#36A2EB",
    Hiburan: "#FFCE56",
    Belanja: "#4BC0C0",
    Tagihan: "#9966FF",
    Kesehatan: "#FF9F40",
    Pendidikan: "#C9CBCF",
    Lainnya: "#7BC8A4",
};
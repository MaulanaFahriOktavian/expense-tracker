// Format angka menjadi Rupiah
// Contoh: 1500000 -> "Rp 1.500.000"
export const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
};

// Format tanggal menjadi lebih mudah dibaca
// Contoh: "2025-01-15" -> "15 Jan 2025"
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

// Generate ID unik sederhana
export const generateId = (): string => {
    return crypto.randomUUID();
};
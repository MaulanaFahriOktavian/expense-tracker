// Format angka menjadi Rupiah
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format tanggal menjadi lebih mudah dibaca
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

// Export expenses ke format CSV
export const exportToCSV = (expenses: any[]): void => {
  if (expenses.length === 0) {
    alert("Tidak ada data untuk diexport!");
    return;
  }

  // Headers
  const headers = ["Tanggal", "Kategori", "Deskripsi", "Nominal (Rp)"];
  
  // Rows
  const rows = expenses.map((exp) => [
    exp.date,
    exp.category,
    `"${exp.description}"`, // Wrap dalam quotes untuk handle koma
    exp.amount.toString(),
  ]);

  // Gabungkan headers dan rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Buat blob dan trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  // Nama file dengan tanggal hari ini
  const today = new Date().toISOString().split("T")[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `laporan-pengeluaran-${today}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
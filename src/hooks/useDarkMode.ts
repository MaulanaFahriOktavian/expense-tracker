import { useState, useEffect } from "react";

export const useDarkMode = () => {
  // Cek localStorage saat pertama kali load
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Kembalikan state dan fungsi untuk mengubah state
  return { isDark, toggleDarkMode: () => setIsDark(!isDark) };
};
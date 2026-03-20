import { useState, useEffect } from "react";

export default function ThemeToggle() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  function toggleTheme() {
    const newTheme = !dark;

    setDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg border text-sm 
      bg-white dark:bg-gray-800 
      text-gray-800 dark:text-white
      hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

import { useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false)

    function toggleTheme(){
        const newTheme = !dark
        setDark(newTheme)

        if (newTheme) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            Alternar Tema
        </button>
    )
}

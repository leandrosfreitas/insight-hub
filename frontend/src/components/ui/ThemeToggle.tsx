import { useState, useEffect } from "react";

export default function ThemeToggle() {

    const [dark, setDark] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("theme") === "dark"
        setDark(saved)

        if (saved) {
            document.documentElement.classList.add("dark")
        }
    }, [])

    function toggleTheme(){
        const newTheme = !dark
        setDark(newTheme)

        if (newTheme) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }

    return (
        <button onClick={toggleTheme}>
            {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
    )
}

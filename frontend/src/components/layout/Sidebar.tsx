import { useAuth } from "../../context/AuthContext"

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const Sidebar = ({ isOpen, setIsOpen }: Props) => {

  const { logout } = useAuth()

  return (
    <aside
      className={`
        fixed md:relative z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
        w-64 h-full
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
      `}
    >

      {/* HEADER */}
      <div className="p-6 text-xl font-semibold flex justify-between items-center
                      text-gray-800 dark:text-gray-100">
        InsightHub

        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden text-gray-600 dark:text-gray-300"
        >
          ✕
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 space-y-2">

        <a
          href="/dashboard"
          className="
            block py-2 px-3 rounded
            text-gray-700 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
        >
          Dashboard
        </a>

        <a
          href="/indicators"
          className="
            block py-2 px-3 rounded
            text-gray-700 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
        >
          Indicadores
        </a>

        <a
          href="/comparison"
          className="
            block py-2 px-3 rounded
            text-gray-700 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
        >
          Comparação
        </a>

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={logout}
          className="
            w-full py-2 rounded
            bg-gray-900 text-white
            dark:bg-gray-700
            hover:bg-gray-800 dark:hover:bg-gray-600
            transition
          "
        >
          Logout
        </button>
      </div>

    </aside>
  )
}

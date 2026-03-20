import { useAuth } from "../../context/AuthContext"

export const Sidebar = ({ isOpen, setIsOpen }: any) => {

  const { logout } = useAuth()

  return (
    <aside
      className={`
        fixed md:relative z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
        w-64 bg-white dark:bg-gray-800 border-r
        h-full
      `}
    >

      <div className="p-6 text-xl font-semibold flex justify-between">
        InsightHub
        <button onClick={() => setIsOpen(false)} className="md:hidden">✕</button>
      </div>

      <nav className="flex-1 px-4 space-y-2">

        <a href="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Dashboard
        </a>

        <a href="/indicators" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Indicadores
        </a>

      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full py-2 bg-gray-900 text-white rounded"
        >
          Logout
        </button>
      </div>

    </aside>
  )
}

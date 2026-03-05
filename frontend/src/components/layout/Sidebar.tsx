import { useAuth } from "../../context/AuthContext"

export const Sidebar = () => {

  const { logout } = useAuth()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

      <div className="p-6 text-xl font-semibold">
        InsightHub
      </div>

      <nav className="flex-1 px-4">

        <a
          href="/dashboard"
          className="block py-2 px-3 rounded hover:bg-gray-100"
        >
          Dashboard
        </a>

      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>

    </aside>
  )
}

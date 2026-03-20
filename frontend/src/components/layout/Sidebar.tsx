import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const Sidebar = ({ isOpen, setIsOpen }: any) => {

  const { logout } = useAuth();

  return (
    <aside
      className={`
        fixed md:relative z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
        w-64 
        bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700
        h-full flex flex-col
      `}
    >

      {/* HEADER */}
      <div className="p-6 text-xl font-semibold flex justify-between text-gray-800 dark:text-white">
        InsightHub
        <button onClick={() => setIsOpen(false)} className="md:hidden">✕</button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 space-y-2">

        <Link to="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Dashboard
        </Link>

        <Link to="/indicators" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Indicadores
        </Link>

        <Link to="/comparison" className="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Comparação
        </Link>

      </nav>

      {/* LOGOUT FIXO EMBAIXO */}
      <div className="p-4 border-t mt-auto">
        <button
          onClick={logout}
          className="w-full py-2 bg-gray-900 text-white rounded"
        >
          Logout
        </button>
      </div>

    </aside>
  );
};

import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

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
        h-screen flex flex-col
      `}
    >

      {/* HEADER */}
      <div className="p-6 flex justify-between items-center">
        <Logo />
        <button onClick={() => setIsOpen(false)} className="md:hidden">✕</button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 space-y-2">

        <Link
          to="/dashboard"
          className="block py-2 px-3 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Dashboard
        </Link>

        <Link
          to="/indicators"
          className="block py-2 px-3 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Indicadores
        </Link>

        <Link
          to="/comparison"
          className="block py-2 px-3 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Comparação
        </Link>

      </nav>

      {/* LOGOUT NO FUNDO */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <button
          onClick={logout}
          className="w-full py-2 rounded 
          bg-gray-900 dark:bg-gray-700
          text-white 
          hover:bg-gray-800 dark:hover:bg-gray-600"
        >
          Logout
        </button>
      </div>

    </aside>
  );
};

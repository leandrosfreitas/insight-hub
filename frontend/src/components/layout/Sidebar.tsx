import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ isOpen, setIsOpen }: any) => {

  const { logout } = useAuth();
  const location = useLocation();

  const linkClass = (path: string) =>
    `block py-2 px-3 rounded transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <aside
      className={`
        fixed md:relative z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300
        w-64 
        bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700
        h-full
      `}
    >

      {/* HEADER */}
      <div className="p-6 text-xl font-semibold flex justify-between items-center text-gray-800 dark:text-white">
        InsightHub
        <button onClick={() => setIsOpen(false)} className="md:hidden">✕</button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 space-y-2">

        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/indicators" className={linkClass("/indicators")}>
          Indicadores
        </Link>

        {/* ✅ NOVA ABA */}
        <Link to="/comparison" className={linkClass("/comparison")}>
          Comparação
        </Link>

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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

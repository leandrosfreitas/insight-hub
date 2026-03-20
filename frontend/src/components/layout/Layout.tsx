import { useState } from "react";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: any) => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-4 md:p-10 overflow-auto">

        {/* botão mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 md:hidden bg-gray-800 text-white px-3 py-2 rounded"
        >
          ☰
        </button>

        {children}

      </main>

    </div>
  );
};

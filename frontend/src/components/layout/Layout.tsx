import { type ReactNode } from "react"
import { Sidebar } from "./Sidebar"

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-gray-50">
      
      <Sidebar />

      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>

    </div>
  )
}

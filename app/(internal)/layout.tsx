import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { AppSidebar } from "../../components/dashboard/sidebar/sidebar"
import Header from "../../components/Header/Header"

type Layout = {
  children: ReactNode
}

function Layout({ children }: Layout) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full py-2 px-4">
        <Header sticky />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default Layout
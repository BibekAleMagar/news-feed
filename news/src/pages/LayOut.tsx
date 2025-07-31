import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "../components/sideBar"
import { Logout } from "../components/logOut"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full p-2">
        <SideBar />

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center px-5">
            <SidebarTrigger className="cursor-pointer"/>
            <Logout />
          </div>

          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

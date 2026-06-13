import type React from "react"
import { StaffSidebar } from "./_components/staff-sidebar"
import { Header } from "../../../components/header"
import { SidebarProvider } from "../../../components/sidebar-provider"
import { auth } from "../../../../auth"
import { redirect } from "next/navigation"
import { SessionProvider } from "next-auth/react"
import { ClientOnly } from "../../../components/client-only"

export default async function StaffDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth();

  if(!session){
    redirect("/");
  }

  if(session?.user?.role?.name !== "STAFF"){
    redirect("/");
  }

  const userName = session?.user?.name;
  const userRole = session?.user?.role?.name;

  // const users = await getUsers();

  // const totalUsers: number = users.length;  

  return (
    <SessionProvider>
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <StaffSidebar name={userName} role={userRole}/>
        <div className="lg:pl-72">
          <ClientOnly>
            <Header name={userName} />
          </ClientOnly>    
          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  </SessionProvider>
  )
}


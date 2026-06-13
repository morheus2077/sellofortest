"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "../../../../components/sidebar-provider"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Wallet, BarChart3, Settings, HelpCircle, LogOut, Menu, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logoutAction } from "@/app/(auth)/_actions/logoutAction"
import { SessionProvider, useSession } from "next-auth/react"

interface SidebarProps {
  name?: string | undefined | null,
  role?: string | undefined | null
}

export function AdminSidebar({ name, role }: SidebarProps) {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()

  if(!name || !role){
    return null;
  }

  return (
    <>
    <SessionProvider>
      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggle}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background",
          "transition-transform duration-300 ease-in-out",
          "border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-lg font-semibold">{name}  <br /> <span className="text-muted-foreground text-xs">{role === "ADMIN" && "Administrador"}</span></span>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={toggle}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-2">
            <nav className="grid gap-1">
              {footerItems.map((item, index) => (
                <div key={index}>
                  {item.subItems ? (
                    <div className="space-y-1">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                      {/* <div className="pl-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                              pathname === subItem.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                            )}
                          >
                            <span>{subItem.name}</span>
                            {subItem.description && (
                              <span className="ml-auto text-xs text-muted-foreground">{subItem.description}</span>
                            )}
                          </Link>
                        ))}
                      </div> */}
                    </div>
                  ) : (
                    <form action={logoutAction}>
                      <button
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                        {item.description && (
                          <span className="ml-auto text-xs text-muted-foreground">{item.description}</span>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      </SessionProvider>
    </>
  )
}

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Usuários", href: "/admin/users", icon: Users, badge: "" },
  { name: "Mercearias", href: "/admin/groceries", icon: Store, badge: "" },
  // { name: "Transactions", href: "/admin/transactions", icon: Wallet },
  { name: "Estatísticas", href: "/admin/statistics", icon: BarChart3 },
]

const footerItems = [
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    subItems: [
      { name: "Profile", href: "/admin/settings/profile", description: "Update your details" },
      { name: "Security", href: "/admin/settings/security", description: "Manage your password" },
      { name: "Communication", href: "/admin/settings/communication", description: "Email and phone" },
      { name: "Permissions", href: "/admin/settings/permissions", description: "Access control" },
    ],
  },
  // { name: "Help", href: "/help", icon: HelpCircle, description: "Get support" },
  { name: "Sair", href: "/logout", icon: LogOut, description: "Terminar sessão" },
]


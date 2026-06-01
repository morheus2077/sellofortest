'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersIcon, Store, DollarSign ,WalletIcon, UserPlusIcon, UserXIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"

interface DashboardResumeProps {
    usersCount: number,
    groceriesCount?: number,
    todaySalesCount: number,
    todayRevenue: number
}

export function DashboardResumeCards({ usersCount, groceriesCount, todaySalesCount, todayRevenue }: DashboardResumeProps){
    return(
              <Tabs defaultValue="daily" className="space-y-4">
        {/* <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="daily">Hoje</TabsTrigger>
            <TabsTrigger value="weekly">7d</TabsTrigger>
            <TabsTrigger value="monthly">30d</TabsTrigger>
          </TabsList>
        </div> */}

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gray-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de mercearias</CardTitle>
                <Store color="gray" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{groceriesCount}</div>
                {/* <p className="text-xs text-muted-foreground">+12% from yesterday</p> */}
              </CardContent>
            </Card>

            <Card className="bg-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de usuários</CardTitle>
                <UsersIcon color="blue" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usersCount}</div>
                {/* <p className="text-xs text-muted-foreground">+2.5% from last week</p> */}
              </CardContent>
            </Card>

            <Card className="bg-purple-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
                <WalletIcon color="purple" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todaySalesCount}</div>
                {/* <p className="text-xs text-muted-foreground">+18% from yesterday</p> */}
              </CardContent>
            </Card>

            <Card className="bg-green-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita total de hoje</CardTitle>
                <DollarSign color="green" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayRevenue} Mzn</div>
                {/* <p className="text-xs text-muted-foreground">-4% from yesterday</p> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    )
}
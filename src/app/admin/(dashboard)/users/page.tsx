import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { File, Search, UserCog } from "lucide-react"
import { CreateUserDialog } from "./create-user-dialog"
import { UsersClient } from "./users-client"
import { fetchUsersData } from "./users.data"

export default async function UsersPage() {

  const {
    users,
    roles,
    groceries
  } = await fetchUsersData()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários</p>
        </div>
        <CreateUserDialog roles={roles} groceries={groceries} />
      </div>

      <Card>
        {/* <CardHeader className="p-4"> */}
          {/* <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar usuários..." className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" variant="outline" size="sm">
                Exportar em PDF <File/>
              </Button>
            </div>
          </div> */}
        {/* </CardHeader> */}
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[160]">
            <UsersClient users={users} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

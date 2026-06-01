"use client"

import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { CreateUserAction } from "@/app/admin/(dashboard)/_actions/CreateUserAction"
import { UserRolesProps } from "../_actions/GetUsersRoleAction"
import { Spinner } from "@/components/ui/spinner"
import { GroceryProps } from "../_actions/GetGroceriesActions"

const initialState = {
  success: false,
  message: '',
}

interface CreateUserDialogProps {
  roles: UserRolesProps[] | undefined,
  groceries: GroceryProps[] | undefined
}

export function CreateUserDialog({ roles, groceries }: CreateUserDialogProps) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [grocery, setGrocery] = useState("")
  const [contact, setContact] = useState("")
  const[userRoles, setUserRoles] = useState(roles || undefined);
  const[availabeGroceries, setAvailableGroceries] = useState(groceries || undefined)

  const [open, setOpen] = useState(false);
  const [state, FormAction, isPending] = useActionState(CreateUserAction, null);

   useEffect(() => {
    if (state?.success) {
      setOpen(false)       
      setName("")          
      setEmail("")
      setPassword("")
      setContact("")
      setGrocery("")
    }

  }, [state?.success])

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
    {state?.success === false && (
      <div className="mb-4 rounded-md bg-red-50 p-4">
        <div className="flex">
          <span className="text-red-500">{state?.message}</span>
        </div>
      </div>
    )}
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white hover:bg-green-700">
          <UserPlus className="mr-2 h-4 w-4 " />
          Criar usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Criar um novo usuário</DialogTitle>
          <DialogDescription>
            Adicione um novo usuário ao sistema.
          </DialogDescription>
        </DialogHeader>
        <form  action={FormAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                name="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name" 
                placeholder="Insira o nome:" 
                required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
              name="email" 
              id="email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="emaildocliente@gmail.com" 
              required />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
              <Label htmlFor="password">Palavra-passe</Label>
              <Input 
              name="password" 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Insira a palavra-passe:" 
              required />
            </div>

              <div className="space-y-2">
              <Label htmlFor="contact">Contacto</Label>
              <Input
                id="contact"
                name="contact"
                placeholder="Ex: 833517395"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            </div> 

             <div className="flex gap-4 ">
              <div className="space-y-2">
                <Label htmlFor="idType">Mercearia</Label>
                <Select name="grocery" required>
                  <SelectTrigger id="idType">
                    <SelectValue placeholder="Selecione mercearia" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabeGroceries?.map((grocery, index)=>(
                      <SelectItem key={index} value={grocery.id}>{grocery.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idType">Função</Label>
                <Select name="role" required>
                  <SelectTrigger id="idType">
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles?.map((role, index)=>(
                      <SelectItem key={index} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div> 

          </div>
          <DialogFooter>
            <Button
            disabled={isPending} 
            type="button" 
            variant="outline"
            onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button 
            className="bg-green-600 text-white hover:bg-green-700" 
            disabled={isPending} 
            type="submit">
              {isPending ? <Spinner color="white"/> : "Criar usuário"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}


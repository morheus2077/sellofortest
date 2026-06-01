"use client"

import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreateGroceryAction } from "../_actions/CreateGroceryAction" 
import { Plus } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function CreateGroceryDialog() {

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const [state, FormAction, isPending] = useActionState(CreateGroceryAction, null);

   useEffect(() => {
    if (state?.success) {
      setFormData({
        name: "",
        location: "",
        contact: "",    
      }) 
      setOpen(false)      
    }

  }, [state?.success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Nova Mercearia
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Mercearia</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar uma nova mercearia no sistema
          </DialogDescription>
        </DialogHeader>
        <form action={FormAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Nome da Mercearia</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Mercearia do João"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                name="location"
                placeholder="Ex: Matadouro"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="contact">Contacto</Label>
              <Input
                id="contact"
                name="contact"
                placeholder="Ex: 833517395"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idType">Gerente</Label>
                <Select name="user" required>
                  <SelectTrigger id="idType">
                    <SelectValue placeholder="Selecione o gerente" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers?.map((user, index)=>(
                      <SelectItem key={index} value={user.id}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>  */}

            {/* <div className="col-span-2 space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
            type="submit" 
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700">
              {isPending ? <Spinner/> : "Cadastrar Mercearia"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

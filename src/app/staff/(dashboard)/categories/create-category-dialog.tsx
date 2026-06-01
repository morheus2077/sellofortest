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
import { CircleCheck, UserPlus } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Category } from "@/types/types"
import { CreateProductAction } from "../../../../lib/_actions/products/CreateProductAction"
import { ConfirmedActionAlert } from "../../../../components/confirmed-action-alert"
import { CreateCategoryAction } from "@/lib/_actions/categories/CreateCategoryAction"

const initialState = {
  success: false,
  message: '',
}

interface CategoryProps {
    categories: Category[]
}

export function CreateCategoryDialog() {

  const[name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const[openConfirmation, setOpenConfirmation] = useState(false);
  const [state, FormAction, isPending] = useActionState(CreateCategoryAction, null);

   useEffect(() => {
    if (state?.success) {
      setOpen(false)       
      setName("") 
      setOpenConfirmation(true)     
    }

  }, [state])

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
          Criar categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Criar uma nova categoria</DialogTitle>
          <DialogDescription>
            Adicione uma nova categoria ao sistema.
          </DialogDescription>
        </DialogHeader>
        <form  action={FormAction}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="grid col-span-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                name="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name" 
                placeholder="Ex: Manteiga rama 200g:" 
                required />
              </div>
            </div>
            </div>                   

          <DialogFooter className="mt-8">
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
              {isPending ? <Spinner color="white"/> : "Criar Categoria"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <ConfirmedActionAlert 
    icon={ <CircleCheck size={50} color="green"/> } 
    message={state?.message}
    isOpen={openConfirmation}
    setOpen={() => {setOpenConfirmation(false)}}
    />
    </>
  )
}


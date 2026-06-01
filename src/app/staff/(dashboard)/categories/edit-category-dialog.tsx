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
import { Spinner } from "@/components/ui/spinner"
import { Category, Product } from "@/types/types"
import { EditProductAction } from "../../../../lib/_actions/products/EditProductAction"
import { ConfirmedActionAlert } from "../../../../components/confirmed-action-alert"
import { CircleCheck } from "lucide-react"
import { EditCategoryAction } from "@/lib/_actions/categories/EditCategoryAction"

interface Props {
    isOpen: boolean,
    setOpen: (open: boolean) => void;
    category: Category | undefined | null
}

export function EditCategoryDialog({ isOpen, setOpen, category }: Props ) {

  const[openDialog, setOpenDialog] = useState(false);
  const[categoryId, setCategoryId] = useState("");
  const[name, setName] = useState("");

  const [state, FormAction, isPending] = useActionState(EditCategoryAction, null);

  useEffect(()=>{
    if(category){
      setName(category.name) 
      setCategoryId(category.id)  
    } 
  }, [category])

    useEffect(() => {
    if (state?.success) {
      setOpen(false)       
      setName("") 
      setOpenDialog(true)    
    }

  }, [state])

    useEffect(() => {
        if (!isOpen) {
            setCategoryId("");
            setName("");
        }
    }, [isOpen]);

  return (
    <>
    <Dialog open={isOpen} onOpenChange={setOpen}>
    {state?.success === false && (
      <div className="mb-4 rounded-md bg-red-50 p-4">
        <div className="flex">
          <span className="text-red-500">{state.messsage}</span>
        </div>
      </div>
    )}

    {state?.success === true &&(
      <ConfirmedActionAlert
      icon={ <CircleCheck color="blue" size={50}/> } 
      isOpen={openDialog}
      setOpen={()=>{setOpenDialog(false)}}
      message={state.messsage}/>
    )}
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription>
            Edite a categoria no sistema.
          </DialogDescription>
        </DialogHeader>
        <form  action={FormAction}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <input type="hidden" name="categoryId" value={categoryId} />
            <div className="grid col-span-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                name="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name" 
                required />
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
              {isPending ? <Spinner /> : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}


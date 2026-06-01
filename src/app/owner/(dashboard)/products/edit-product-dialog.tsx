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

interface Props {
    categories?: Category[],
    isOpen: boolean,
    setOpen: (open: boolean) => void;
    product: Product | null
}

export function EditProductDialog({ categories, isOpen, setOpen, product }: Props ) {

  const[openDialog, setOpenDialog] = useState(false);
  const[productId, setProductId] = useState("");
  const[name, setName] = useState("");
  const[price, setPrice] = useState<number>(0);
  const[minimumStock, setMinimumStock] = useState<number>(0);
  const[selectedCategory, setSelectedCategory] = useState("");
  const[availableCategories, setAvailableCategories] = useState<Category[]>([]);

  const [state, FormAction, isPending] = useActionState(EditProductAction, null);

  useEffect(()=>{
    if(product){
      setName(product.name) 
      setPrice(product.price)
      setMinimumStock(product.minimumStock)  
      setProductId(product.id)  
      setAvailableCategories(categories || [])   
      setSelectedCategory(product.category.id) 
    } 
  }, [product, categories])

   useEffect(() => {
    if (state?.success) {
      setOpen(false)       
      setName("") 
      setPrice(0)
      setMinimumStock(0)  
      setProductId("") 
      setOpenDialog(true)    
    }

  }, [state])

  useEffect(() => {
  if (!isOpen) {
    setProductId("");
    setName("");
    setPrice(0);
    setMinimumStock(0);
  }
}, [isOpen]);

  return (
    <>
    <Dialog open={isOpen} onOpenChange={setOpen}>
    {state?.success === false && (
      <div className="mb-4 rounded-md bg-red-50 p-4">
        <div className="flex">
          <span className="text-red-500">{state?.message}</span>
        </div>
      </div>
    )}

    {state?.success === true &&(
      <ConfirmedActionAlert
      icon={ <CircleCheck color="blue" size={50}/> } 
      isOpen={openDialog}
      setOpen={()=>{setOpenDialog(false)}}
      message={state.message}/>
    )}
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>
            Edite o produto no sistema.
          </DialogDescription>
        </DialogHeader>
        <form  action={FormAction}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <input type="hidden" name="productId" value={productId} />
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-1">
                <Label htmlFor="price">Preço</Label>
                <Input
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required />
              </div>
  
               <div className="flex gap-4 col-span-1">
                <div className="space-y-2">
                  <Label htmlFor="idType">Categoria</Label>
                  <Select name="categoryId" required value={selectedCategory}>
                    <SelectTrigger id="idType">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories?.map((category, index)=>(
                        <SelectItem key={index} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
  
                <div className="space-y-2">
                <Label htmlFor="minimumStock">Estoque mínimo</Label>
                <Input
                  id="minimumStock"
                  name="minimumStock"
                  value={minimumStock}
                  onChange={(e) => setMinimumStock(Number(e.target.value))}
                  required
                />
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


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
import { ArrowBigUp, CircleCheck, UserPlus } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Product } from "@/types/types"
import { AddStockAction } from "../../../../lib/_actions/products/AddStockAction"
import { AddStockProductSelect } from "@/components/add-stock-product-select"
import { ConfirmedActionAlert } from "../../../../components/confirmed-action-alert"

const initialState = {
  success: false,
  message: '',
}

interface ProductProps {
  products: Product[]
}

export function AddStockDialog({ products }: ProductProps ) {

  const[quantity, setQuantity] = useState<string>("");
  const[availableProducts, setAvailableProducts] = useState(products || [])
  const [open, setOpen] = useState(false);
  const [state, FormAction, isPending] = useActionState(AddStockAction, null);
  const[productId, setProductId] = useState<string>("");
  const[openDialog, setOpenDialog] = useState(false);
  const[emptyFieldsMessage, setEmptyFieldsMessage] = useState(false);

  useEffect(()=>{
    setAvailableProducts(products)
  },[products])

  function resetForm(){
    setOpen(false)       
    setQuantity("") 
    setProductId("")  
  }

  useEffect(() => {
    if (state?.success) {
      resetForm()
      setOpenDialog(true)
    }
  }, [state])

  useEffect(() =>{
    if(!open){
      resetForm()
    }
  });

  function handleSubmit(){
    if(!productId || !quantity){
      setEmptyFieldsMessage(true)
      return;
    } else {
      setEmptyFieldsMessage(false)
    }

    const form = document.getElementById("add-stock-form") as HTMLFormElement || null;

    form?.requestSubmit();
  }

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
        <Button 
        className="bg-red-600 text-white hover:bg-white hover:text-red-600 cursor-pointer" 
        variant="outline" 
        size="sm"
        >
          Entrada de estoque
          <ArrowBigUp/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Entrada de estoque</DialogTitle>
          <DialogDescription>
            Atualize o stock de qualquer produto.
          </DialogDescription>
        </DialogHeader>
        <form id="add-stock-form" action={FormAction}>
            <div className="grid grid-cols-2">
               <div className="flex gap-4 col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="idType">Produto</Label>
                  {/* <Select  name="productId" required>
                    <SelectTrigger id="idType">
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts?.map((product, index)=>(
                        <SelectItem key={index} value={product.id}>{product.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                    <AddStockProductSelect
                    className=" md:w-  md:max-w-[500]"
                    products={availableProducts}
                    value={productId}
                    onValueChange={setProductId}
                    /> 

                <div>
                {emptyFieldsMessage === true &&(
                  <span
                  className="text-red-600 text-sm "
                  >Preencha todos os campos</span>
                )}
              </div>                
                </div>
                <input type="hidden" name="productId" value={productId} />
              </div>
                <div className="space-y-2 col-span-1 mt-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  className="w-xs"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  placeholder="0"
                />
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
            type="button"
            onClick={handleSubmit}
            >
              {isPending ? <Spinner color="white"/> : "Atualizar estoque"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    <ConfirmedActionAlert
    icon={ <CircleCheck size={50} color="red"/>}
    isOpen={openDialog}
    setOpen={()=>{setOpenDialog(false)}}
    message={state?.message}
    />
    </>
  )
}


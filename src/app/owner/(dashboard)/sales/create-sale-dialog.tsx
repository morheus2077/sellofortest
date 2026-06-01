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
import { BadgeCheck, Trash2, UserPlus } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Product } from "@/types/types"
import { ProductSelect } from "@/components/product-select"
import { CreateSaleAction } from "../../../../lib/_actions/sales/CreateSaleAction"
import { ConfirmedActionAlert } from "../../../../components/confirmed-action-alert"

type SaleItemDraft = {
  id: string,
  product: Product
  quantity: number
  subtotal: number
}

interface PoductProps {
    products: Product[]
}

export function CreateSaleDialog({ products }: PoductProps ) {

  const[openDialog, setOpenDialog] = useState(false);
  const[items, setItems] = useState<SaleItemDraft[]>([]);
  const[productId, setProductId] = useState<string>("");
  const[quantity, setQuantity] = useState<number>(1);
  const[price, setPrice] = useState<number>(0);
  const[total, setTotal] = useState<number>(0);
  const[paidValue, setPaidValue] = useState<number>(0);
  const[exchange, setExchange] = useState<number>(0);
  const[availableProducts, setAvailableProducts] = useState(products || []);
  const[notEnough, setNotEnough] = useState<boolean>(false)
  const[emptyFieldsError, setEmptyFieldsError] = useState(false)
  const[withouStockMessage, setWithoutStockMessage] = useState<boolean>(false)
  const[open, setOpen] = useState(false);
  const[state, FormAction, isPending] = useActionState(CreateSaleAction, null);

  function resetForm(){
    setOpen(false)       
    setPrice(0)
    setPaidValue(0)
    setExchange(0)
    setQuantity(1)
    setNotEnough(false)
    setWithoutStockMessage(false)
    setEmptyFieldsError(false)
    setProductId("")  
    setTotal(0)  
    setItems([])  
  }

  useEffect(() => {
    if (state?.success) {
      resetForm()
      setOpenDialog(true)
    }
  }, [state]);

  useEffect(() =>{
    if(!open){
      resetForm()
    }
  }, [open])
  

  useEffect(() => {
    verifyPaidValue();
  }, [paidValue, total])
  
  function verifyPaidValue(){
    if (paidValue < total) {
      setNotEnough(true)
      setExchange(0)  
      return;
    } else {
      setNotEnough(false)
    }
    
    setExchange(paidValue - total)
  }

  function handleAddItem() {

    if(!items){
    alert("Erro, escolha um produto")  
    }
    
    setWithoutStockMessage(false)
    verifyPaidValue()

    calculateExchange(paidValue)
        
    const product = products.find(p => p.id === productId)!;

    const existingIndex = items.findIndex(item => item.id === productId)

    //se o indice for maior ou diferente de -1, o produto existe
    const newQuantity = existingIndex >= 0
    ? items[existingIndex].quantity + quantity
    : quantity

    if(newQuantity > product.inStock){
      setWithoutStockMessage(true);
      return;
    }
    
    if(!product){
      alert("Erro, escolha um produto")
      return;
    }
    
    if(product?.inStock === 0){
      setWithoutStockMessage(true)
      return;
    }
    
    if(quantity > product!.inStock){
      setWithoutStockMessage(true)
      console.log(`so tem em estoque ${product?.inStock} mas voce quer ${quantity}`)
      return;
    }

    const subtotal = product.price * quantity
    setTotal(total + subtotal)
    
    if (existingIndex >= 0) {
      const updatedItems = [...items]
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: newQuantity,
        subtotal: updatedItems[existingIndex].subtotal + subtotal
      }

      setItems(updatedItems)
    } else {
      
      setItems(prev => [
        ...prev,
        {
          id: productId,
          product,
          quantity,
          subtotal
        }
      ])

    }
    
    setProductId("")
    setQuantity(1)
}

  function calculateExchange(value: number){

    if(Number.isNaN(value)){
        setPaidValue(0)
        return;
    }

    setPaidValue(value)
  }

  function handleValidateAndSubmit() {
    if (!items.length || !paidValue || !total) {
      setEmptyFieldsError(true);
      return;
    }

    if(paidValue < total){
      setEmptyFieldsError(true)
      return;
    }

    setEmptyFieldsError(false);

    const form = document.getElementById("create-sale-form") as HTMLFormElement || null;
    form.requestSubmit();
  }

  function handleRemoveItem(item: SaleItemDraft, index: number){
    setItems(prev => prev.filter((_, i) => i !== index)) 
    setTotal(total - (item.product.price * item.quantity))
  }

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen} >
    {state?.success === false && (
      <div className="mb-4 rounded-md bg-red-50 p-4">
        <div className="flex">
          <span className="text-red-500">{state?.message}</span>
        </div>
      </div>
    )}

    {state?.success === true &&(
      <ConfirmedActionAlert
      icon={ <BadgeCheck color="green" size={50}/> }
      isOpen={openDialog}
      setOpen={() =>{setOpenDialog(false)}}
      message={state.message}
      />
    )}
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white hover:bg-green-700">
          <UserPlus className="mr-2 h-4 w-4 " />
          Nova venda
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Realizar uma venda</DialogTitle>
          <DialogDescription>
            Escolha os produtos e realize uma venda.
          </DialogDescription>
        </DialogHeader>
        <form id="create-sale-form" action={FormAction}>
            <div className="flex gap-3 items-center justify-center space-y-2 flex-col">
                <div className="flex items-center gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="idType">Produto</Label>
                    <ProductSelect
                    className="min-w-[440] max-w-[440]"
                    products={availableProducts}
                    value={productId}
                    onValueChange={setProductId}
                    />
                  </div>
                  <div className="space-y-2 max-w-28">
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={(e) =>  setQuantity(Number(e.  target.value))}
                    required />
                  </div>
                  <Button
                  className="bg-green-600 text-white hover:bg-green-700      space-y-2 mt-6"
                  onClick={handleAddItem}
                  type="button"
                  >
                    Adicionar
                  </Button>
                </div>

                  {withouStockMessage === true && (
                  <span
                  className="text-xs text-red-600"
                  >O produto não tem estoque suficiente!</span>                   
                  )}
            </div>
            
            <div className="my-4 flex flex-col gap-3">
              {items.map((item, index) => (
                <div
                key={index}
                className="flex items-center justify-between border p-rounded-md"
                >
            <div>
                <p className="font-medium"><span>{item.quantity} - </span> {item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.product.price} MT
                </p>
            </div>

            <Button
            variant="destructive"
            size="sm"
            type="button"
            onClick={() => {
              handleRemoveItem(item, index)
            }}
            >
              <Trash2 />
            </Button>
               </div>
            ))}
            </div>
            
            <div className="grid grid-cols-4 gap-4 space-y-5" >
              <div className="space-y-2 col-span-1">
                <Label htmlFor="paidValue">Valor pago</Label>
                <Input
                name="paidValue"
                id="paidValue"
                value={paidValue}
                onChange={(e) =>{
                    const val = parseFloat(e.target.value)
                    if (Number.isNaN(val)) {
                    setPaidValue(0)
                    return
                }
                setPaidValue(val)}
                }
                required 
                />
                {notEnough && (
                    <Label className="text-xs text-red-600">Valor insuficiente</Label>
                )}
              </div>

            <div className="space-y-2">
                <Label htmlFor="total">total</Label>
                <Input
                  id="total"
                  name="total"
                  value={total}
                  onChange={(e) => setTotal(Number(e.target.value))}
                  required
                  readOnly
                />
              </div>

            <div className="space-y-2">
                <Label htmlFor="exchange">Troco</Label>
                <Input
                  id="exchange"
                  name="exchange"
                  value={exchange}
                  onChange={(e) => setExchange(Number(e.target.value))}
                  readOnly
                />
              </div>
          </div>

          {emptyFieldsError === true &&(
            <span
            className="text-red-600 text-sm"
            >Preencha todos os campos</span>
          )}

          <input
            type="hidden"
            name="items"
            value={JSON.stringify(items)}
          />

          <DialogFooter>
            <Button
            disabled={isPending && notEnough} 
            type="button" 
            variant="outline"
            onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button 
            className="bg-green-600 text-white hover:bg-green-700" 
            disabled={isPending} 
            type="button"
            onClick={handleValidateAndSubmit}
            >
              {isPending ? <Spinner color="white"/> : "Finalizar venda"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}


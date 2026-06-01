'use client'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ReactNode, useActionState, useEffect, useState } from "react";
import { DeleteUserAction } from "../_actions/DeleteUserAction";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  message: string | undefined,
  isOpen: boolean,
  setOpen: (value: boolean)=> void;
  icon: ReactNode;
  userId: string;
}

export function DeleteUserDialog({ message, isOpen, setOpen, icon, userId }: Props){

    const[state, FormAction, isPending] = useActionState(DeleteUserAction, null)

    console.log(userId)

    useEffect(()=>{
        if(state?.success){
            setOpen(false)
        }
    }, [state])
    
    return(
    
    <AlertDialog
        open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex items-center justify-center">
      <AlertDialogTitle className="hidden">hidden</AlertDialogTitle>
      <AlertDialogDescription asChild>
        <div
        className="text-xl text-black
        flex flex-col items-center justify-center gap-3"
        >
          <i>
            {icon}
          </i>
          <span className="text-black">{message}</span>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <form id="delete-form-id" action={FormAction}>
        <input 
        type="hidden"
        name="userId"
        id="userId"
        value={userId}
        />
        <Button
        type="submit"
        className="w-full bg-red-500"
        disabled={isPending}
        >
            {isPending ? <Spinner color="white"/> : "Sim"}
        </Button>
    </form>
    <AlertDialogCancel>Cancelar</AlertDialogCancel>
    </AlertDialogContent>
    </AlertDialog>
    )
}
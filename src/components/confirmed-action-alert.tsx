import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CircleCheck } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  message: string | undefined,
  isOpen: boolean,
  setOpen: (value: boolean)=> void;
  icon: ReactNode;
}

export function ConfirmedActionAlert({ message, isOpen, setOpen, icon }: Props){
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
    <AlertDialogCancel>sair</AlertDialogCancel>
    </AlertDialogContent>
    </AlertDialog>
    )
}
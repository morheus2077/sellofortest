"use client"

import {  useFormStatus } from "react-dom"
import { Badge } from "@/components/ui/badge"
import { EnableGroceryAction } from "../_actions/EnableGroceryAction"
import { useActionState, useEffect } from "react"

export function EnableGroceryForm({
  groceryId,
  onSuccess,
}: {
  groceryId: string
  onSuccess?: (status: string) => void }) {
  
  const [state, formAction, isPending] = useActionState(EnableGroceryAction, null)

    useEffect(() => {
      if (state?.success && onSuccess) {
        onSuccess(state.status)
      }
    }, [state, onSuccess])

  return (
    <form action={formAction}>
      <input type="hidden" name="groceryId" value={groceryId} />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm("Tem certeza que deseja reativar esta mercearia?")) {
          e.preventDefault()
        }
      }}
    >
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 cursor-pointer"
      >
        {pending ? "Ativando..." : "Ativar"}
      </Badge>
    </button>
  )
}
"use client"

import { DisableGroceryAction } from "../_actions/DisableGroceryAction"
import { useFormStatus } from "react-dom"
import { Badge } from "@/components/ui/badge"
import { useActionState, useEffect } from "react"

export function DisableGroceryForm({
  groceryId,
  onSuccess,
}: {
  groceryId: string
  onSuccess?: (status: string) => void }) {
  
  const [state, formAction, isPending] = useActionState(DisableGroceryAction, null)

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
        if (!window.confirm("Tem certeza que deseja desativar esta mercearia?")) {
          e.preventDefault()
        }
      }}
    >
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 cursor-pointer"
      >
        {pending ? "Desativando..." : "Desativar"}
      </Badge>
    </button>
  )
}
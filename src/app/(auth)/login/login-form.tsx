'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginAction } from "./_actions/loginAction"
import { useActionState } from "react"
import { Spinner } from "@/components/ui/spinner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [state, FormAction, isPending] = useActionState(loginAction, null)

  return (
    <form action={FormAction} className={cn("flex flex-col gap-6", className)} {...props}>
        {state?.success === false && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <span className="text-red-500">{state?.message}</span>
            </div>
          </div>
        )}
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Bem vindo de volta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Insira o seu email e senha para acessar o seu painel. 
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input name="email" id="email" type="email" placeholder="seuemail@gmail.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Palavra-passe</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu a sua senha?
            </a>
          </div>
          <Input name="password" id="password" type="password" required />
        </Field>
        <Field>
          <Button
          disabled={isPending}
          type="submit">
          {isPending ? <Spinner/> : "Entrar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

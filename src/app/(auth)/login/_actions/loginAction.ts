'use server'

import { redirect } from 'next/navigation'
import { auth, signIn } from '../../../../../auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { AuthError } from 'next-auth'

interface ActionState {
  success: boolean
  message: string
}

export async function loginAction(_prevState: ActionState | null, formData: FormData) {
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        const session = await auth();

        console.log(session)
        
    } catch (error) {
        if(isRedirectError(error)){
            throw error;
        }

        if(error instanceof AuthError && error.type === 'CredentialsSignin'){
            return {
                success: false,
                message: 'Erro, verifique as suas credenciais e tente novamente'
            }
        }

        return {
            success: false,
            message: 'Ocorreu um erro inesperado, tente novamente mais tarde'
        }
    }

    const session = await auth();
    
    if (!session?.user) {
        return redirect("/");
    }
    
    switch (session?.user?.role?.name) {
        case "ADMIN":
            return redirect("/admin/dashboard");
        case "STAFF":
            return redirect("/staff/dashboard");
        case "OWNER":
            return redirect("/owner/dashboard");
        default:
            return redirect("/");
    }

}
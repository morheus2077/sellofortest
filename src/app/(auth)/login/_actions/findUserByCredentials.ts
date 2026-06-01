'use server'

import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt";

interface UserCredentialsProps {
    email: string,
    password: string
}

interface User {
    id: string,
    name: string,
    email: string,
    role: {
        id: string,
        name: string
    },
    groceryId: string
}

export async function findUserByCredentials({ email, password }: UserCredentialsProps): Promise<User | null>{

    const user = await prisma.users.findFirst({
        where: {
            email: email
        },
        include: {
            role: true
        }
    })

    if(!user){
        return null;
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        return null;
    }

    const userData: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: {
            id: user.role.id,
            name: user.role.name
        },
        groceryId: user.groceryId
    }

    return userData;
}
import { prisma } from "@/lib/prisma";

export interface UserRolesProps {
    id: string,
    name: string
}

export async function GetUsersRoles(){

    try{
    const roles: UserRolesProps[] = await prisma.role.findMany();

    return roles;
    } catch (error) {
        console.log(error)
    }

}
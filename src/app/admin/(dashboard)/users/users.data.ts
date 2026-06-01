'use server'
import { getUsers } from "../_actions/GetusersAction"
import { GetUsersRoles } from "../_actions/GetUsersRoleAction"
import { getGroceries } from "../_actions/GetGroceriesActions"
 

export async function fetchUsersData(){

    const[
        users,
        roles,
        groceries
    ] = await Promise.all([
        getUsers(),
        GetUsersRoles(),
        getGroceries()
    ]);

    return {
        users,
        roles,
        groceries
    }
}
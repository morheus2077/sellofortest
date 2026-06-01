'use server'

import { GetTodayStaffSalesAction } from "../_actions/GetTodayGrocerySales"
import { GetGroceryProducts } from "../../../../lib/_actions/products/GetGroceryProductsAction"

export async function fetchOwnerSalesData(){

    const[ 
        sales,
        products
     ] = await Promise.all([
        GetTodayStaffSalesAction(),
        GetGroceryProducts()
     ])

     return{
        sales,
        products
     }
}
'use server'

import { GetTodayStaffSalesAction } from "../_actions/GetTodayStaffSales"
import { GetGroceryProducts } from "../../../../lib/_actions/products/GetGroceryProductsAction"

export async function fetchStaffSalesData(){

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
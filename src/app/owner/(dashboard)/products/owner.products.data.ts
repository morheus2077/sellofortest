'use server'

import { GetCategories } from "../../../../lib/_actions/products/GetCategoriesAction"
import { GetGroceryProducts } from "../../../../lib/_actions/products/GetGroceryProductsAction"

export async function fecthOwnerProductsData(){

    const[
        categories,
        products
    ] = await Promise.all([
        GetCategories(),
        GetGroceryProducts()
    ])

    return {
        categories,
        products
    }
}
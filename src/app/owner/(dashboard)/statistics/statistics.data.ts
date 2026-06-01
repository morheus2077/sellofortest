import { GetGroceryProducts } from "@/lib/_actions/products/GetGroceryProductsAction";
import { GetGroceryAllSoldProducts } from "../_actions/GetGroceryAllSoldProducts";
import { GetGroceryAllSales } from "../_actions/GetGroceryAllSales";
import { GetGroceryTotalRevenues } from "../_actions/GetGroceryTotalRevenues";
import { GetGroceryMostSoldProducts } from "../_actions/GetGroceryMostSoldProducts";
import { GetGroceryLeastSoldProducts } from "../_actions/GetGroceryLeastSoldProducts";
import { GetGroceryLast30DaysData } from "../_actions/GetGroceryLast30DaysData";

export async function fetchOwnerStatisticsData(){

    const [
        groceryProducts,
        groceryAllSoldProducts,
        groceryAllSales,
        groceryTotalRevenues,
        groceryMostSoldData,
        groceryLeastSoldData,
        groceryLast30DaysData
    ] = await Promise.all([
        GetGroceryProducts(),
        GetGroceryAllSoldProducts(),
        GetGroceryAllSales(),
        GetGroceryTotalRevenues(),
        GetGroceryMostSoldProducts(),
        GetGroceryLeastSoldProducts(),
        GetGroceryLast30DaysData()
    ])

    return {
        groceryProducts,
        groceryAllSoldProducts,
        groceryAllSales,
        groceryTotalRevenues,
        groceryMostSoldData,
        groceryLeastSoldData,
        groceryLast30DaysData
    }
}
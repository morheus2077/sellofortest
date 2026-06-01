import { GetGroceryProducts } from "@/lib/_actions/products/GetGroceryProductsAction";
import { GetGroceryLast7DaysRevenues } from "../_actions/GetGroceryLast7DaysRevenues";
import { GetTodayGrocerySoldProductsCount } from "../_actions/GetTodayGrocerySoldProductsCount";
import { GetTodayGrocerySalesCount } from "../_actions/GetTodayGrocerySalesCount";
import { GetTodayGroceryRevenue } from "../_actions/GetTodayGroceryRevenue";

export async function fetchOwnerDashboardData(){

    const[
        products,
        last7DaysRevenues,
        todayGrocerySoldProducts,
        todayGrocerySalesCount,
        todayGroceryRevenue
    ] = await Promise.all([
        GetGroceryProducts(),
        GetGroceryLast7DaysRevenues(),
        GetTodayGrocerySoldProductsCount(),
        GetTodayGrocerySalesCount(),
        GetTodayGroceryRevenue()
    ])

    return {
        products,
        last7DaysRevenues,
        todayGrocerySoldProducts,
        todayGrocerySalesCount,
        todayGroceryRevenue
    }
}
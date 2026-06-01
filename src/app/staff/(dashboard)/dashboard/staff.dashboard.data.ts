'use server'

import { GetTodayStaffSalesCount } from "../_actions/GetTodayStaffSalesCount"
import { GetTodayStaffRevenue } from "../_actions/GetTodayStaffRevenue"
import { GetTodayStaffSoldProductsCount } from "../_actions/GetTodayStaffSoldProducts"
import { GetGroceryProducts } from "../../../../lib/_actions/products/GetGroceryProductsAction";
import { GetStaff7LastDaysRevenues } from "../_actions/GetStaffLast7DaysRevenues";

export async function fetchStaffDashboardData(){

    const[
        todaySalesCount,
        todayRevenue,
        todaySoldProducts,
        products,
        last7DaysRevenues
    ] = await Promise.all([
        GetTodayStaffSalesCount(),
        GetTodayStaffRevenue(),
        GetTodayStaffSoldProductsCount(),
        GetGroceryProducts(),
        GetStaff7LastDaysRevenues()
    ])

    return {
        todaySalesCount,
        todayRevenue,
        todaySoldProducts,
        products,
        last7DaysRevenues
    }
}
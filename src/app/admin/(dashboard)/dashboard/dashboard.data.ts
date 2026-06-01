'use server'

import { getUsers } from "../_actions/GetusersAction"
import { getGroceries } from "../_actions/GetGroceriesActions"
import { GetTodaySalesCount } from "../_actions/GetTodaylSalesCount"
import { GetTodayRevenue } from "../_actions/GetTodayRevenue"
import { GetTodaySales } from "../_actions/GetTodaySalesAction"
import { GetRevenueByMonth } from "../_actions/GetRevenueByMonth"

export async function fetchDashboardData(){
    const[
        users,
        groceries,
        todaySalesCount,
        todayRevenue,
        recentSales,
        revenuesByMonth, 
    ] = await Promise.all([
        getUsers(),
        getGroceries(),
        GetTodaySalesCount(),
        GetTodayRevenue(),
        GetTodaySales(),
        GetRevenueByMonth()
    ]);

    return {
        users,
        groceries,
        todaySalesCount,
        todayRevenue,
        recentSales,
        revenuesByMonth
    }
}
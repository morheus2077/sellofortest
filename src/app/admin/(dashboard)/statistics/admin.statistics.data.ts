'use server'

import { GetAllProductsCount } from "../_actions/GetAllProductsCount"
import { GetBestSellerGroceries } from "../_actions/GetBestSellerGroceries"
import { GetLast30DaysData } from "../_actions/GetLast30DaysData"
import { getSales } from "../_actions/GetSalesAction"
import { GetTotalRevenue } from "../_actions/GetTotalRevenue"

export async function AdminStatisticsData(){

    const[ 
        allProductsCount,
        allSales,
        totalRevenue,
        bestSellerGroceries,
        last30DaysData
    ] = await Promise.all([
        GetAllProductsCount(),
        getSales(),
        GetTotalRevenue(),
        GetBestSellerGroceries(),
        GetLast30DaysData()
    ])

    return {
        allProductsCount,
        allSales,
        totalRevenue,
        bestSellerGroceries,
        last30DaysData
    }
}
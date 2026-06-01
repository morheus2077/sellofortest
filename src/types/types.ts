// types.ts
export interface GroceryTableUser {
  id: string
  name: string
  role?: { name: string }
  groceryId: string
}

export interface GroceryLight {
  id: string
  name: string
  contact: string
  location: string
  status: string
  createdAt: Date,
  updatedAt: Date,
  users: GroceryTableUser[]
  products: { id: string; name: string; price: number }[]
}

export interface Category {
    id: string,
    name:string
}

export interface Product {
  id: string,
  name: string,
  price: number,
  category: {
    id: string,
    name: string
  }
  minimumStock: number,
  groceryId: string,
  inStock: number,
  createdAt: Date; 
  updatedAt: Date
}

export interface Sale {
  id: string,
  groceryId: string,
  userId: string,
  total: number,
  exchange: number,
  paidValue: number,
  items: {
    id: string,
    quantity: number,
    unitPrice: number,
    subtotal: number,
    saleId: string
  }[]
}

export interface Items {
  id: string,
  quantity: number,
  unitPrice: number,
  subtotal: number,
  saleId: string
}
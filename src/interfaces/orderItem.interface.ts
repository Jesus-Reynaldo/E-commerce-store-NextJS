export interface Order{
  id: string,
  total: number,
  itemsInOrder: number,
  subtotal: number,
  OrderItem: OrderItem[]
  OrderAddress: OrderAddress,

}

export interface OrderItem{
  id: string,
  quantity: number,
  price: number,
  product: Product
}

export interface Product{
  id: string,
  title: string,
  price: number,
  images: string[]
}

export interface OrderAddress{
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  address2: string,
  zipCode: string,
  city: string,
  phone: string,
}
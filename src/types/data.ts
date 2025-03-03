import { Status } from "./status"

export interface User{
  id:string,
  email:string,
  username:string,
  created_at:string
}

export interface Category{
  id:string,
  categoryName:string
}

export interface Product {
id?:string,
productName:string,
productDescription:string,
productPrice:number,
productTotalStockQty:number,
productImageUrl:string,
createdAt?:string,
updatedAt?:string,
userId:string,
categoryId:string,
User?:User,
Category?:Category
}

export enum PaymentMethod{
COD='cod',
Khalti= 'khalti'
}

export enum OrderStatus{
  Pending ='pending',
  Delivered= 'delivered',
  Ontheway = 'ontheway',
  Cancel = 'cancelled',
  Preparation = 'preparation',
  All = 'all'
}

interface Payment{
paymentMethod:PaymentMethod
}

interface  ItemDetails{
productId:string,
quantity:number
}

export interface OrderData{
  phoneNumber:number,
  shippingAddress:string,
  totalAmount:number,
  paymentDetails:Payment,
  items:ItemDetails[]
  id:string,
  orderStatus:OrderStatus
}

export interface SingleOrderItem{
id:string,
quantity:number,
orderId:string,
Product:{
  id:string,
  productName:string,
  productTotalStockQty:number,
  productImageUrl:string,
  productPrice:number,
  categoryId:string,
  Category:{
    categoryName ? :string
  }
},
Order:{
  id:string,
  phoneNumber:number,
  shippingAddress:string,
  totalAmount:number,
  paymentDetails:Payment,
  orderStatus:OrderStatus,
  Payment:{
    paymentMethod:string,
    PaymentStatus:string
  }
}
}

export interface InitialState{
  products:Product[],
  users:User[],
  orders:OrderData[],
  status: Status,
  categories:Category[],
  singleProduct:Product | null,
  singleOrder: SingleOrderItem[]
  
}
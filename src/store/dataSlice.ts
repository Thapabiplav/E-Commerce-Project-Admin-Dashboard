import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { InitialState, OrderData, Product, User } from '../types/data'
import { Status } from '../types/status'

import { AppDispatch } from './store'
import { APIAuthenticated } from '../http'


const initialState:InitialState={
  orders:[],
  products:[],
  users:[],
  status:Status.LOADING,
  singleProduct:null

}

const dataSlice= createSlice({
  name:'data',
  initialState,
  reducers:{
   setStatus(state:InitialState,action:PayloadAction<Status> ){
    state.status=action.payload
   },
   setProduct(state:InitialState,action:PayloadAction<Product []>){
    state.products = action.payload
   },
   setOrders(state:InitialState,action:PayloadAction<OrderData[]>){
    state.orders= action.payload
   },
   setUsers(state:InitialState,action:PayloadAction<User[]>){
    state.users= action.payload
   },
   setSingleProduct(state:InitialState,action:PayloadAction<Product>){
    state.singleProduct= action.payload
  }
}
  })

export const {setOrders,setProduct,setStatus,setUsers,setSingleProduct}=dataSlice.actions
export default dataSlice.reducer

export function fetchProducts(){
  return async function fetchProductsThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response =  await APIAuthenticated.get('admin/product')
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setProduct(response.data.data))
      }
      else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function fetchOrders(){
  return async function fetchOrdersThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response= await APIAuthenticated.get('order')
      if(response.status === 200 ){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setOrders(response.data.data))
      }
      else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function fetchUsers(){
  return async function fetchUsersThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response= await APIAuthenticated.get('users')
      if(response.status === 200 ){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setUsers(response.data.data))
      }
      else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function addProduct(data:Product){
  return async function addProductThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response= await APIAuthenticated.post('/admin/product',data)
      if(response.status === 200 ){
        dispatch(setStatus(Status.SUCCESS))
      }
      else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function deleteProduct(id:string){
  return async function deleteProductThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response= await APIAuthenticated.delete('/admin/product'+id)
      if(response.status === 200 ){
        dispatch(setStatus(Status.SUCCESS))
      }
      else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function singleProduct(id:string){
  return async function singleProductThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response= await APIAuthenticated.get('/admin/product'+id)
      if(response.status === 200 ){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setSingleProduct(response.data.data))
      }
      else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
    }
  }
}
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  cartData= new EventEmitter<product[] | []>();

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:3000/products"

cartUrl="http://localhost:3000/cart"

orderUrl ="http://localhost:3000/orders"

  addProduct(data:product){
   return this.http.post(`${this.baseUrl}`,data);
    
  }
  
  productList(){
    return this.http.get<product[]>(`${this.baseUrl}`)
  }
 
  deleteProduct(id:number | string){
    return this.http.delete(`${this.baseUrl}/${id}`)
   }

   getProduct(id:string){
    return this.http.get<product>(`${this.baseUrl}/${id}`)
   }

   updateProduct(product:product){
    return this.http.put(`${this.baseUrl}/${product.id}`,product)
   }

   popularProducts(){
    return this.http.get<product[]>(`${this.baseUrl}?_limit=3`)
   }

   trendyProducts(){
    return this.http.get<product[]>(`${this.baseUrl}?_limit=8`);
   }
  
   searchProducts(query:string){
    return this.http.get<product[]>(`${this.baseUrl}?category=${query}`);
    
   }
   



   localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data])
      
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData)
    }
    
  }

  removeItemsFromCart(productId:number | string){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items :product[]=JSON.parse(cartData)
      items = items.filter((item:product)=> productId!== item.id)
      console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
      
    }
  }
  
  addToCart(cartData:cart){
    return this.http.post(`${this.cartUrl}`,cartData)
  }

  getCartList(userId:number){
    return this.http.get<product[]>(`${this.cartUrl}?userId=${userId}`,{observe: 'response'}).subscribe((result)=>{
      if(result && result.body ){
        this.cartData.emit(result.body);
      }
      
      
    })
  }

 removeToCart(cartId:number | string){
  return this.http.delete(`${this.cartUrl}/`+cartId,{observe: 'response'})
 }

 currentCart(){
  let userStore = localStorage.getItem('user')
  let userData = userStore && JSON.parse(userStore);
 
  
  return this.http.get<cart[]>(`${this.cartUrl}?userId=${userData.id}`)
  
 }

 orderNow(data:order){
 return this.http.post(`${this.orderUrl}`,data);
 }

 orderList(){
  let userStore = localStorage.getItem('user')
  let userData = userStore && JSON.parse(userStore);
  return this.http.get<order[]>(`${this.orderUrl}?userId=${userData.id}`);
 }

 deleteCartItem(cartId:number | string){
  return this.http.delete(`${this.cartUrl}/`+cartId,{observe:'response'}).subscribe(
    (result)=>{
      if(result){
        this.cartData.emit([])
      }
    }
  )
 }

 CancelOrder(orderId:number){
  return this.http.delete(`${this.orderUrl}/${orderId}`)
 }


}



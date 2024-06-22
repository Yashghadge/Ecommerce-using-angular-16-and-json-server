import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor( private http:HttpClient,private router:Router) { }



  isSellerLoggedIn= new BehaviorSubject<boolean>(false);

  isLoggedInError= new EventEmitter(false)

  baseUrl="http://localhost:3000/seller"

  userSignUp(data:signUp){
    return this.http.post(`${this.baseUrl}`,data,{observe:'response'}).subscribe(
      (result)=>{
        console.warn(result);
        // if(result){
        //  this.isSellerLoggedIn.next(true);
        //  localStorage.setItem('seller',JSON.stringify(result.body))
        //  alert("User signing successfull")
        // //  this.router.navigate(['seller-home'])
        // }
       
      }
    )
   }
   reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
   }

   userLogin(data:login){
     console.warn(data);
     this.http.get(`${this.baseUrl}?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe(
      (result:any)=>{
      
        console.log(result);
        
        if(result && result.body && result.body.length==1){
          this.isLoggedInError.emit();
          localStorage.setItem('seller',JSON.stringify(result.body))
          
          this.router.navigate(['seller-home'])
        }else{
          console.warn("Login Failed");
          
          this.isLoggedInError.emit(true)
          
        }
      })
   }

   
}

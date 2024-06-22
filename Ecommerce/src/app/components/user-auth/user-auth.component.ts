import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cart, login, product, signUp } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true
  authError :string=''
  userSignUpMessage:string | undefined;
   @ViewChild('userSignUp',{static:false}) userSignUp! :NgForm;
  constructor(private user:UserService,private product:ProductService){}
  

 

  ngOnInit(): void {
    this.user.userAuthReolad();
  }

  signUp(data:signUp){
   
    this.user.userSignUp(data)
    this.userSignUpMessage = "User Registered successfully";
    setTimeout(()=>{
        this.userSignUpMessage=undefined
          },3000)
          this.userSignUp.reset();
  }

  login(data:login){
  this.user.userLogin(data);
   this.user.invalidUserAuth.subscribe(
    (result)=>{
      console.warn(result,"apple");
      if(result){
        this.authError="Enter Vaild User Credentials"
      }else{
        this.localCartToRemoteCart()
      }
    }
   )
  }

  openSignUp(){
  this.showLogin=false
  }

  openLogin(){
  this.showLogin=true
  }

  localCartToRemoteCart(){
   let data = localStorage.getItem('localCart');
   let user = localStorage.getItem('user');
   let userId = user && JSON.parse(user).id;
   if(data){
    let cartDataList:product[]= JSON.parse(data);
   
    cartDataList.forEach((product:product,index)=>{
      let cartData:cart={
        ...product,
        productId:product.id,
        userId
      };

    delete cartData.id;
    setTimeout(()=>{
      this.product.addToCart(cartData).subscribe(
        (result)=>{
          if(result){
          console.warn("item stored in db");
          }
        }
      )
    },500);
   if(cartDataList.length===index+1){
    localStorage.removeItem('localCart')
   }
 })
 
   }
   setTimeout(()=>{
    this.product.getCartList(userId);
   },2000);
  }

  //   localCartToRemoteCart(){
  // }

}

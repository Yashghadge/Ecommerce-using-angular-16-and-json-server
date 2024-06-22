import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { signUp } from 'src/app/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin=false
 authError:String='';
sellerSignUPMessage:string | undefined

 @ViewChild('sellerSignup',{static:false}) sellerSignup!: NgForm;

  constructor(private seller:SellerService ,private router:Router){}
  
  ngOnInit(): void {
    this.seller.reloadSeller()

  }

  
  signUp(data:signUp):void{
    console.warn(data)
  this.seller.userSignUp(data)

    this.sellerSignUPMessage="Seller registered successfully"
  
  setTimeout(()=>this.sellerSignUPMessage=undefined,3000)
  this.sellerSignup.resetForm()
  }
   
  login(data:signUp):void{
    console.warn(data)
    this.seller.userLogin(data);
    this.seller.isLoggedInError.subscribe(
      (isError)=>{
       if(isError){
        this.authError="Invalid Credentials"
       }
        
      }
    )
  }

  openLogin(){
    this.showLogin=true
  }
   
  openSignUp(){
    this.showLogin=false
  }
}

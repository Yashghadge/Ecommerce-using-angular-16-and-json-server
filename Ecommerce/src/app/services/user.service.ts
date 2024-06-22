import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  invalidUserAuth= new EventEmitter<boolean>(false)


  constructor(private http:HttpClient,private router:Router) { }
  apiUrl="http://localhost:3000/users";

userSignUp(user:signUp){
  console.warn(user);
  this.http.post(`${this.apiUrl}`,user,{observe:'response'}).subscribe(
    (result)=>{
    
      // if(result){
      //   localStorage.setItem('user',JSON.stringify(result.body))
      //   // this.router.navigate(['/'])
      // }
    }
  )
}


userLogin(data:login){
  this.http.get<signUp[]>(`${this.apiUrl}?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe(
    (result)=>{
      
      if(result && result.body?.length){
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user',JSON.stringify(result.body[0]))
        this.router.navigate(['/'])
      }else{
        this.invalidUserAuth.emit(true)
      }
    }
  )
}



userAuthReolad(){
  if(localStorage.getItem('user')){
    this.router.navigate(['/'])
  }

}
 


}

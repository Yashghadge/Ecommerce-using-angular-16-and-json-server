import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage:string|undefined;
  constructor(private product:ProductService){}

 @ViewChild('addProduct',{static: false}) addProduct! : NgForm;

 
  ngOnInit(): void {
   
  }
  

  submit(data:product){
   
    this.product.addProduct(data).subscribe(
      (result)=>{
        console.warn(result);
        if(result){
          this.addProductMessage="Product is successfully added"
          
        }
        setTimeout(()=>this.addProductMessage=undefined,3000)
        
      }
    );
    this.addProduct.resetForm() ;
  }
  

}

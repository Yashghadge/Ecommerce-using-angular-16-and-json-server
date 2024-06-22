import { Component, OnInit } from '@angular/core';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[];
  productMessage:undefined | string;
  icon= faTrash;
  editIcon=faEdit;
constructor(private product:ProductService){}

  ngOnInit(): void {
    this.allProductList();
  }

allProductList(){
  this.product.productList().subscribe(
    (result)=>{
      console.warn(result);
      this.productList=result;
    }
  )
}

deleteProduct(id:string | number){
  console.warn("test id",id)
this.product.deleteProduct(id).subscribe(
  (result)=>{
this.productMessage="Product is deleted";
this.allProductList();
  }
)
setTimeout(()=>{
  this.productMessage=undefined;
},3000)
}

}

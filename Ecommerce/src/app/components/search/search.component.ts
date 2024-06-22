import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 searchResult:undefined | product[];
noSearchResult=false
 searchQuery:string|undefined|null
 constructor(private activeRoute:ActivatedRoute,private product:ProductService){}
 
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query')
    console.warn(query);
    query && this.product
    .searchProducts(query).subscribe(
      (result)=>{
        this.searchResult=result
        if(this.searchResult.length<1){
          this.noSearchResult=true
          this.searchQuery=query;

        }
      }
    )
    
  }

}

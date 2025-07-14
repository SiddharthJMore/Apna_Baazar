import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../classes/product';
import { ApiService } from '../_services/api.service';
import { CartService } from '../_services/cart.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private router:Router,
    private activatedRouter:ActivatedRoute,
    private apiService: ApiService,
    private viewportScroller: ViewportScroller,
    private cartService: CartService,
    public userService: UserService,
    private api: ApiService){}

  public productId!: number;

  product!: any;

  ngOnInit(): void {

    this.viewportScroller.scrollToPosition([0, 0]);

    this.activatedRouter.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')||"");
      this.productId = id;
    });

    this.apiService.getProduct(this.productId).subscribe(
      (response)=>{
            this.product= response;

        Object.assign(this.product, { quantity: 1, total: this.product.price });
      });
      (error: any)=>{
        console.log(error)
      };

      console.log(this.product);
    }


  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe(
      (response) => {
        console.log(response);
        console.log("Successfully deleted the product!")
      },
      (error) => {
        console.log(error);
        console.log("Failed to delete the product!")
      }
    );

    window.location.reload();
  }

  buyNow(item:Product){
    this.cartService.addtoCart(item);
    this.router.navigate(["/cart"]);
  }

  setId(id: number){
    localStorage.setItem("productId", JSON.stringify(id));
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../classes/product';
import { ApiService } from '../_services/api.service';
import { CartService } from '../_services/cart.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  public jaadu: boolean = true;
  // public jaaduApiService: boolean=this.api.jaaduVar;

  searchKey: string = '';
  constructor(
    private api: ApiService,
    private cartService: CartService,
    public userService: UserService,
    private router:Router) {}

  ngOnInit(): void {

    this.api.getProducts().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
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

  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });

    this.jaadu = false;
    console.log(this.jaadu);
  }

  moveToProductPage(id:number){
    this.router.navigate(['/product', id]);
  }
}

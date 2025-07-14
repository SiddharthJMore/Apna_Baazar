import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService, private router:Router) { }

  ngOnInit(): void {
    window.scroll(0,0);

    this.cartService.getProducts()
      .subscribe(res=>{
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
    });

    this.cartService.saveCart(this.products);

    console.log(this.cartService.getCartItem());

  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.removeAllCart();
  }

  checkOut() {
    this.grandTotal= this.cartService.getTotalPrice();

    localStorage.setItem('cart_total', JSON.stringify(this.grandTotal));
    this.router.navigate(['/payment']);
  }



}

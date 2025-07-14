import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { CartService } from '../_services/cart.service';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    public apiService: ApiService,
    private cartService : CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe((res: string | any[])=>{
      this.totalItem = res.length;
  })
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }

  // for cart

  public totalItem : number = 0;
  public searchTerm !: string;

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);

    // this.apiService.jaadu();
  }


}

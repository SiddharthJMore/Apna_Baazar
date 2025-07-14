import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Product } from '../classes/product';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit{

  message:String | undefined;
  product:Product = new Product();

  constructor(private userService: UserService, private userAuthService: UserAuthService, public ro:Router, public http:HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.forAdmin();
    this.openSnackBar();
  }

  forAdmin() {
    this.userService.forAdmin().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }

  addProduct(){
    console.log(this.product);

    this.http.post<Product>("http://localhost:8082/addNewProduct", this.product).subscribe(
      (data)=>{console.log(data), this.ro.navigate(['/admin']), console.log("Data saved successfully"),
      alert("Data saved successfully")},error=>console.log(error));

    window.location.reload();
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar() {
    this._snackBar.open('For Updating or Deleting the product check HomePage!!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 6 * 1000,
    });
  }

}

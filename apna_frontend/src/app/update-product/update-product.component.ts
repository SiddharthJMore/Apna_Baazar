import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../classes/product';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  idForUpdate!: number;
  product: Product = new Product();
  productOld: Product= new Product();

  constructor(private apiService: ApiService,private _snackBar: MatSnackBar){};

  ngOnInit(): void {
    this.idForUpdate= JSON.parse(localStorage.getItem("productId") || "");

    this.apiService.getProduct(this.idForUpdate).subscribe(
      (response)=>{
        this.productOld= response;
      },
      (error)=>{
        console.log(error);
      }
    )

    this.product.id=this.idForUpdate;
  }

  updateProduct(){
    console.log(this.product);
    this.apiService.updateProduct(this.product);
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar() {
    this._snackBar.open('Updated Successfully!!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
    });
  }

}

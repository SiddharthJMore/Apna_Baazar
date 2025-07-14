import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MailRequest } from '../classes/mail-request';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  mailRequest: MailRequest = new MailRequest();
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  orderId = localStorage.getItem("orderId");
  paymentId = localStorage.getItem("paymentId");
  customerName = localStorage.getItem("customerName");
  customerEmail = localStorage.getItem("customerEmail");
  customerPhone = localStorage.getItem("customerPhone");
  customerAddress = localStorage.getItem("customerAddress");
  pincode = localStorage.getItem("pincode");
  district = localStorage.getItem("district");
  state = localStorage.getItem("state");
  cartTotal = localStorage.getItem("cart_total");

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {

    this.mailRequest.customerName = localStorage.getItem("customerName") || "";
    this.mailRequest.customerEmail = localStorage.getItem("customerEmail") || "";
    this.mailRequest.phoneNumber = localStorage.getItem("customerPhone") || "";
    this.mailRequest.amount = JSON.parse(localStorage.getItem("cart_total") || "");
    this.mailRequest.orderId = localStorage.getItem("orderId") || "";
    this.mailRequest.paymentId = localStorage.getItem("paymentId") || "";
    this.mailRequest.address = (`${localStorage.getItem("customerAddress")}, ${localStorage.getItem("district")}, ${localStorage.getItem("state")}, ${localStorage.getItem("pincode")}, India`);
    this.mailRequest.dateOfOrder = new Date();

    if (this.mailRequest.customerEmail!= null) {
      this.apiService.sendEmail(this.mailRequest).subscribe(
        (response) =>{
          console.log("Email Sent!!");
          this.openSnackBar();

          // this.order.order_date=`"2023-01-15"`;
          // this.order.billing_customer_name=(localStorage.getItem("customerName") || "");
          // this.order.billing_address =(localStorage.getItem("customerAddress") || "");
          // this.order.billing_city= JSON.stringify(localStorage.getItem("district") || "");
          // this.order.billing_pincode= JSON.stringify(localStorage.getItem("pincode") || "");
          // this.order.billing_state= JSON.stringify(localStorage.getItem("state") || "");
          // this.order.billing_email=JSON.stringify(localStorage.getItem("customerEmail") || "");
          // this.order.billing_phone= JSON.stringify(localStorage.getItem("customerPhone") || "");
          // this.order.sub_total= JSON.parse(localStorage.getItem("cart_total") || "");

          // console.log(this.shippingService.createShipping(this.order));

        },
        (error) =>{
          console.log(error);
        }
      );
    }
    else{
      console.log("Email Id is null try again!");
    }
  }

  openSnackBar() {
    this._snackBar.open('Order details successfully mailed!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4 * 1000,
    });
}
}

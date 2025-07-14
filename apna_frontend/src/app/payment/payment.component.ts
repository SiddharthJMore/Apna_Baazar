import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderServiceService } from '../_services/order-service.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  title = 'Apna Service';
  cart_total:number | undefined;
  protected aFormGroup!: FormGroup;
  siteKey: string ="6LeR3PUjAAAAABSIr-fmV8lTGkQhRTePqrZAZk3H";


  form: any = {};

  constructor(
    private http: HttpClient,
    private orderService:OrderServiceService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    console.log(localStorage.getItem('cart_total'));
    this.cart_total= JSON.parse(localStorage.getItem('cart_total') as any) || [];

    this.form.amount=this.cart_total;

    // for the recaptcha

    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  sayHello() {
    alert("Hello DK");
  }

  paymentId: string | undefined;
  error: string | undefined;

  options = {
    "key": "",
    "amount": "",
    "name": "Apna Baazar",
    "description": "HCL Techbee Project",
    "image": "https://ibb.co/Dzt4kbs",
    "order_id":"",
    "handler": function (response: any){
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "orange"
    }
    };



    onSubmit(): void {
      this.paymentId = '';
      this.error = '';
      this.orderService.createOrder(this.form).subscribe(
      data => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = this.form.name;
        this.options.prefill.email = this.form.email;
        this.options.prefill.contact = this.form.phone;

        if(data.pgName ==='razor2') {
          this.options.image="https://ibb.co/Dzt4kbs";
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
        } else {
          this.options.image="https://ibb.co/Dzt4kbs";
          var rzp2 = new Razorpay(this.options);
          rzp2.open();
        }


        rzp1.on('payment.failed',  (response: { error: { code: any; description: any; source: any; step: any; reason: string | undefined; metadata: { order_id: any; payment_id: any; }; }; }) =>{
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        }
        );
      }
      ,
      err => {
        this.error = err.error.message;
      }
      );
    }

    @HostListener('window:payment.success', ['$event'])
    onPaymentSuccess(event: { detail: any; }): void {
      console.log(event.detail);
      console.log(event);

      // razorpay_order_id
      // razorpay_payment_id

      localStorage.setItem("orderId", event.detail.razorpay_order_id);
      localStorage.setItem("paymentId", event.detail.razorpay_payment_id);
      localStorage.setItem("customerName", this.form.name);
      localStorage.setItem("customerEmail", this.form.email);
      localStorage.setItem("customerPhone", this.form.phone);
      localStorage.setItem("customerAddress", this.form.address);
      localStorage.setItem("pincode", this.form.pincode);
      localStorage.setItem("district", this.form.district);
      localStorage.setItem("state", this.form.state);

      console.log(this.form.name);
      console.log(this.form.phone);
      console.log(this.form.address);
      console.log(localStorage.getItem("cart_total"));

      this.router.navigate(["/paymentSuccess"]);

      this.openSnackBar();

    }



    // for the top notification

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this._snackBar.open('Payment Successfull!!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}

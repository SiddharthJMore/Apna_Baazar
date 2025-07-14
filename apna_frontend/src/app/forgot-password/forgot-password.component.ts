import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordRequest } from '../classes/forgot-password-request';
import { MailRequest } from '../classes/mail-request';
import { ApiService } from '../_services/api.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  mailRequest: MailRequest = new MailRequest();
  errorMsg: any = null;
  forgotPasswordRequest: ForgotPasswordRequest = new ForgotPasswordRequest();

  dbResponseEmail: any=null;
  realOTP!: any;


  // for validation
  emailValid:boolean= true;
  oTPValid:boolean= true;
  passwordValid:boolean= true;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  sendOTPMail(email: String) {

    this.userService.findUserByEmail(email).subscribe(
      (response)=>{
        console.log(response);

        if (response!=null) {
          this.dbResponseEmail=response.email;

          console.log(this.dbResponseEmail);

          this.apiService.sendOTPEmail(this.dbResponseEmail).subscribe(
            (response) => {
              this.realOTP = response;
              this.emailValid= false;
              console.log(response);
              this.errorMsg="Succefully sent mail";
            },
            (error) => {
              this.errorMsg = error;
              console.log(error);
              this.errorMsg = "Cannot send email";
            }
          );

        }
      },
      (error)=>{
        this.errorMsg="User Not Found";
      }
    );

  }

  validateOTP(userOtp: String) {
    if (this.realOTP == userOtp) {
      this.errorMsg = 'OTP validated';
      this.oTPValid= false;
    } else {
      this.errorMsg = 'Wrong OTP';
    }
  }

  updatePassword() {
    this.userService.updatePassword(this.forgotPasswordRequest).subscribe(
      (response) => {
        console.log('Password updated');
        this.errorMsg = "Password updated'";
        this.passwordValid= false;
        console.log(this.forgotPasswordRequest.email);

        setTimeout(() => {
          this.router.navigate(["/login"])
        }, 2000);
      },
      (error) => {
        console.log('Unable to update password');
        this.errorMsg = error;
        console.log(this.forgotPasswordRequest.email);
      }
    );
  }
}

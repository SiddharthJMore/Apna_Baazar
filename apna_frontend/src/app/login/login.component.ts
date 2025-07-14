import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../classes/customer';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,
    private userAuthService:UserAuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ){}

  protected aFormGroup!: FormGroup;
  customer:Customer= new Customer();
  errorMsg: String | undefined;
  siteKey: string ="6LeR3PUjAAAAABSIr-fmV8lTGkQhRTePqrZAZk3H";

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        localStorage.setItem("userFirstName", response.user.userFirstName);
        localStorage.setItem("userLastName", response.user.userLastName);
        localStorage.setItem("userPhone", response.user.userPhone);
        localStorage.setItem("email", response.user.email);

        const role = response.user.role[0].roleName;

        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error), this.errorMsg= (error.error.error+ "!");
      }
    );
  }


  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Customer } from '../classes/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message:String | undefined;
  userFirstName: any | undefined;
  userLastName: any | undefined;
  userPhone: any | undefined;
  email: any | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.forUser();

    // // user info retreive
    // this.userFirstName=JSON.stringify(localStorage.getItem("userFirstName") || "");
    // this.userLastName=JSON.stringify(localStorage.getItem("userLastName") || "");
    // this.userPhone=JSON.stringify(localStorage.getItem("userPhone") || "");
    // this.email=JSON.stringify(localStorage.getItem("email") || "");

    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 5000);

  }

  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}

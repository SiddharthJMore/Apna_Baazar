import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../classes/customer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  constructor(public ro:Router, public http:HttpClient){}

  customer:Customer= new Customer();

  errorMsg: String | undefined;

  onSubmit(){

    console.log(this.customer)

    this.http.post<Customer>("http://localhost:8082/registerNewUser", this.customer)
      .subscribe(data=>{console.log(data), this.ro.navigate(['/home']),
      console.log("User Register Successfully!"), alert("User Register Successfully!")},error=>{console.log(error),this.errorMsg=error, alert(error+ "!")})

  }


}

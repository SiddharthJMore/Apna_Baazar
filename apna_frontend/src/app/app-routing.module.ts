import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TAndcComponent } from './t-andc/t-andc.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [

  {path:"home", title:"Home | Apna Baazar", component:HomeComponent},
  {path:"product/:id", title:"Product | Apna Baazar", component: ProductComponent},
  {path:"login",title:"Login | Apna Baazar", component: LoginComponent},
  {path:"signup",title:"Signup | Apna Baazar", component: SignupComponent},
  {path:"contactUs",title:"Contact Us | Apna Baazar", component: ContactUsComponent},
  {path:"tandc",title:"Terms & Condition| Apna Baazar", component: TAndcComponent},
  {path:"forgotPassword",title:"Forgot Password| Apna Baazar", component: ForgotPasswordComponent},

  {path:"admin",title:"Admin Dashboard | Apna Baazar", component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},

  {path:"cart",title:"Cart | Apna Baazar", component: CartComponent},
  {path:"products", title:"Product | Apna Baazar", component: AllProductsComponent},
  {path:"updateProduct", title:"Update Product | Apna Baazar", component: UpdateProductComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},

  {path:"user",title:"User Dashboard | Apna Baazar", component: UserComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {path:"payment",title:"Payment Dashboard | Apna Baazar", component: PaymentComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {path:"paymentSuccess",title:"Payment Successfull | Apna Baazar", component: PaymentSuccessComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {path:"forbidden",title:"Forbidden", component: ForbiddenComponent},

  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"", title:"Home | Apna Baazar", component:HomeComponent},
  {path:"**", title:"404 | Page Not Found", component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

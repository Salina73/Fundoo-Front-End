import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = 
[
  {path:'login',component:LoginComponent},
  {path:'sign-in',component:SignInComponent},
  {path:'',component:LoginComponent},
  {path:'Forgot-Password',component:ForgotPasswordComponent},
  {path:'Reset-Password',component:ResetPasswordComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

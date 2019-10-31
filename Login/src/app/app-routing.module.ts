import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { ArchieveComponent } from './archieve/archieve.component';


const routes: Routes =
  [
    { path: 'login', component: LoginComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: '', component: LoginComponent },
    { path: 'Forgot-Password', component: ForgotPasswordComponent },
    { path: 'Reset-Password', component: ResetPasswordComponent },
    { path: 'home-dashboard', component: HomeDashboardComponent,canActivate: [AuthGuard]},
    { path: 'archieve', component: ArchieveComponent },
 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

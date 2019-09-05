import { Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AppService } from 'src/service/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
 {
  hide = true;
  login:FormGroup;

  emailId = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  
  constructor(private appService:AppService,private snackbar:MatSnackBar,private route:Router){}

  ngOnInit()
  {
    this.login=new FormGroup(
  {
   emailId : new FormControl(''),
   password : new FormControl('')
  });
  }


  getErrorMessage() {
    return this.emailId.hasError('required') ? 'Email is required' :
        this.emailId.hasError('email') ? 'Not a valid email' :
        this.password.hasError('required') ? 'Password is required' :
            '';
  }
  Login()
  {
    this.appService.login(this.login.value).subscribe(
      (response:any)=>
      {
        if(response.statusCode==200)
       {
          this.snackbar.open("Login Successfully!!!!","close", { duration: 8000 } );   
          this.route.navigate(['/sign-in']);
        }  
        else
          this.snackbar.open("Login failed!!!!","close", { duration: 8000 } );
      }
    );
  }

 }



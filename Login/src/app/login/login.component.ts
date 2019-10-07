import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppService } from 'src/service/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide=true;
  login: FormGroup;

  emailId = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  _bottomSheet: any;

  constructor(private appService: AppService, private snackbar: MatSnackBar, 
    private route: Router) { }

  ngOnInit() {
    this.login = new FormGroup(
      {
        emailId: new FormControl(''),
        password: new FormControl('')
      });
  }


  getErrorMessage() {
    return this.emailId.hasError('required') ? 'Email is required' :
      this.emailId.hasError('email') ? 'Not a valid email' :
        this.password.hasError('required') ? 'Password is required' :
          '';
  }
  Login() {
    this.appService.login(this.login.value).subscribe(
      async (response: any) => {
      
        if (response.statusCode == 200) 
        {       
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', response.token);
          this.snackbar.open("Login Successfully!!!!", "close", { duration: 4000 });
          setTimeout(()=>this.route.navigate(['/home-dashboard']),3000);
        }
        else if (response.statusCode == 201) {
          this.snackbar.open("Incorrect email id or password!!!!", "close", { duration: 8000 });
        }
        else if (response.statusCode == 401){
          this.snackbar.open("Open your mail and click on verification link", "close", { duration: 8000 });
        }
        else if (response.statusCode == 404){
          this.snackbar.open("Login please......", "close", { duration: 8000 });
        }
      }
    );
  }
  delay(arg0: number) {
    throw new Error("Method not implemented.");
  }

}



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/service/app.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot: FormGroup
  emailId = new FormControl('', [Validators.required, Validators.email]);

  constructor(private appService: AppService, private snackbar: MatSnackBar, private route: Router) { }

  ngOnInit() {
    this.forgot = new FormGroup(
      {
        emailId: new FormControl(''),
      });
  }
  getErrorMessage() {
    return this.emailId.hasError('required') ? 'Email is required' :
      this.emailId.hasError('email') ? 'Not a valid email' : '';
  }
  resend() {
    this.appService.forgotPassword(this.forgot.value).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Link sent successfully!!!!", "close", { duration: 8000 });
          this.route.navigate(['/login']);
        }
        else if (response.status == 500)
          this.snackbar.open("Sorry invalid email id!!!!");
      }
    );
  }
}

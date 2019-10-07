import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/service/app.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  reset: FormGroup;

  emailId = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private appService: AppService, private snackbar: MatSnackBar, private route: Router) { }

  ngOnInit() {
    this.reset = new FormGroup(
      {
        emailId: new FormControl(''),
        password: new FormControl('')
      });
  }
  getErrorMessage3() { return this.emailId.hasError('email') ? 'require valid email id ' : ''; }

  getErrorMessage4() { return this.password.hasError('required') ? 'please enter password' : ''; }

  resetPassword() {
    this.appService.resetPassword(this.reset.value).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Password set successfully!!!!", "close", { duration: 8000 });
          this.route.navigate(['/login']);
        }
        else {
          this.snackbar.open("Password failed to reset !!!!", "close", { duration: 8000 });
        }
      }
    );
  }

}


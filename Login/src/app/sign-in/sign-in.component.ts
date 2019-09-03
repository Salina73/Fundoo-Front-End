import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AppService } from 'src/service/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit
{
  hide = true;
  newForm:FormGroup;

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  mobileNum = new FormControl('', [Validators.required]);
  emailId = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private appService:AppService,private snackbar:MatSnackBar,private route:Router){}

  ngOnInit()
  {
    this.newForm=new FormGroup(
  {

  firstName : new FormControl(''),
  lastName : new FormControl(''),
  mobileNum :  new FormControl(''),
  emailId : new FormControl(''),
  password : new FormControl('')
   });
  }

  getErrorMessage() 
  {return this.firstName.hasError('required') ? 'first name is required' : '';}

  getErrorMessage1() 
   { return this.lastName.hasError('required') ? 'last name is required' : ''; }

  getErrorMessage2() 
  { return this.mobileNum.hasError('required') ? 'mobile number is required' : ''; }

  getErrorMessage3() 
   { return this.emailId.hasError('email') ? 'require valid email id ' : ''; }

  getErrorMessage4() 
  { return this.password.hasError('required') ? 'please enter password' : ''; }
  
  Submit()
  {
    this.appService.register(this.newForm.value).subscribe(
      (response:any)=>
      {
        if(response.statusCode==200)
       {
          this.snackbar.open("Registration done!!!!","close", { duration: 8000 } );   
          this.route.navigate(['/login']);
        }  
        else if(response.status==500)
          this.snackbar.open("Registration already register!!!!");
      }
    );
  }

}

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

  firstName = new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]);
  lastName = new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]);
  mobileNum = new FormControl('', [Validators.required,Validators.pattern('\d{5}([- ]*)\d{6}')]);
  emailId= new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]);
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
        else
          this.snackbar.open("Registration already register!!!!");
      }
    );
  }

}

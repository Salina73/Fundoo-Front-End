import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/service/app.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.css']
})
export class CollabComponent implements OnInit {
  profile = [];
  create:FormGroup;

  constructor(public dialogRef: MatDialogRef<CollabComponent>,private snackbar:MatSnackBar,private appService:AppService,
    @Inject(MAT_DIALOG_DATA)public data:any)  { }

  ngOnInit() {
    this.create = new FormGroup(
      {
        email: new FormControl(''),
      
      });
    this.displayProfile();
  }
  displayProfile() {
    this.appService.profile().subscribe(details => {
      this.profile = details
    }
    );
  }
  //Share a Note
  shareNote(){
    this.appService.collaborator(localStorage.getItem('token'),this.data.noteid,this.create.value).subscribe(
      (response: any) => {
        if (response.statusCode == 200) 
        {
          this.snackbar.open("Note shared successfully!!!!", "close", { duration: 8000 });
        }
        if(response.statusCode==401)
        this.snackbar.open("email already exit", "close", { duration: 3000 });
        if(response.statusCode==402)
        this.snackbar.open("email already exit", "close", { duration: 3000 });
      }
    ); 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

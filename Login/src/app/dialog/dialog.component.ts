import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from 'src/service/app.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Note } from '../model/note';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dialog: FormGroup;
  notes: Array<Note>;
  noteid:string;
  title:string;
  description:string;
  constructor(private snackbar:MatSnackBar,private appService:AppService,
    @Inject(MAT_DIALOG_DATA)public data:any) {
  
     }

  ngOnInit() {
    this.dialog = new FormGroup(
      {
        title: new FormControl(''),
        description: new FormControl('')
      });
  }
  display()
  {
    this.appService.display(localStorage.getItem('token')).subscribe
    (myNote => this.notes = myNote);
  }
  updateNote() {
    this.appService.update(localStorage.getItem('token'),this.dialog.value,this.data.noteid).subscribe(
      (response: any) => {
        if (response.statusCode == 200) 
        {
          this.snackbar.open("Note updated successfully!!!!", "close", { duration: 8000 });
        }
      }
    );
  
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/service/app.service';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {
  create:FormGroup;

  constructor(private snackbar:MatSnackBar,private appService:AppService,
     @Inject(MAT_DIALOG_DATA)public data:any)  { }

  ngOnInit() {
    this.create = new FormGroup(
      {
        labelName: new FormControl('')
      });
  }
  createLabel(){
  this.appService.creatingLabel(localStorage.getItem('token'),this.create.value,this.data.noteid).subscribe(
    (response: any) => {
      if (response.statusCode == 200) 
      {
        this.snackbar.open("Label added successfully!!!!", "close", { duration: 8000 });
      }
    }
  );

}
}

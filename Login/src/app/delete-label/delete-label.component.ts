import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/service/app.service';
import { Label } from '../model/label';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delete-label',
  templateUrl: './delete-label.component.html',
  styleUrls: ['./delete-label.component.css']
})
export class DeleteLabelComponent implements OnInit {
  labels:Array<Label>;
  create:FormGroup;
  updateLabels:FormGroup;
  constructor(private snackbar: MatSnackBar, private appService: AppService) { }

  ngOnInit() {
    this.create = new FormGroup(
      {
        labelName: new FormControl('')
      });
      this.updateLabels = new FormGroup(
        {
          labelName: new FormControl('')
        });
    this.displayLabels();
  }
  displayLabels() {
    this.appService.displayLabels(localStorage.getItem('token')).subscribe
      (labels => this.labels = labels);

  }
  createLabel(){
    this.appService.createLabels(localStorage.getItem('token'),this.create.value).subscribe(
      (response: any) => {
        if (response.statusCode == 200) 
        {
          this.snackbar.open("Label added successfully!!!!", "close", { duration: 8000 });
          this.displayLabels() ;
        }
      }
    ); 
  }
  deleteLabel(labelid) {
    this.appService.deletelabels(localStorage.getItem('token'), labelid).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Label deleted successfully!!!!", "close", { duration: 8000 });
          this.displayLabels() ;
        }
      }
    );
  }
  updateLabel(labelid) {
    console.log("id....."+labelid)
    this.appService.updateLabels(localStorage.getItem('token'),labelid,this.updateLabels.value).subscribe(
      (response: any) => {
        if (response.statusCode == 200) 
        {
          this.snackbar.open("Label updated successfully!!!!", "close", { duration: 8000 });
          this.displayLabels() ;
        }
      }
    );
  
  }
}

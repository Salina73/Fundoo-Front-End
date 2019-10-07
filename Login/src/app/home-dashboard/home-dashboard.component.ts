import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/service/app.service';
import { Note } from '../model/note';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})

export class HomeDashboardComponent implements OnInit {
  popup: number = 1
  create: FormGroup;
  notes: Array<Note>;

  constructor(private route: Router, private snackbar: MatSnackBar, private appService: AppService
    , private dialog: MatDialog) { }

  ngOnInit() {
    this.create = new FormGroup(
      {
        title: new FormControl(''),
        description: new FormControl('')
      });
    this.display();

  }
  //logout implementation
  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    this.snackbar.open(" Successfully logout!!!!", "close", { duration: 4000 });
    this.route.navigate(['/login']);
  }
  //display notes
  display() {
    this.appService.display(localStorage.getItem('token')).subscribe
      (myNote => this.notes = myNote);
  }

  openDialog(myNote) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      noteid: myNote.noteid,
      title: myNote.title,
      description: myNote.description
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.display();
      
    });
  }
  //create note
  createNote() {
    this.appService.create(this.create.value, localStorage.getItem('token')).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Note created successfully!!!!", "close", { duration: 8000 });
          this.display();
        }
      }
    );
    this.popup = 1;
  }
  deleteNote(noteid) {
    this.appService.delete(localStorage.getItem('token'), noteid).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Note deleted successfully!!!!", "close", { duration: 8000 });
          this.display();
        }
      }
    );
  }
 
}

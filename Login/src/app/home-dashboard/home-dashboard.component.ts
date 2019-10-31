import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/service/app.service';
import { Note } from '../model/note';
import { DialogComponent } from '../dialog/dialog.component';
import { AddLabelComponent } from '../add-label/add-label.component';
import { Label } from '../model/label';
import { DeleteLabelComponent } from '../delete-label/delete-label.component';
import { CollabComponent } from '../collab/collab.component';


@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})

export class HomeDashboardComponent implements OnInit {
  popup: number = 1

  create: FormGroup;
  searchNote: FormGroup;
  remindMe:FormGroup;
  notes: Array<Note>;
  labels: Array<Label>;
  searchedNotes: Array<Note>;
  profile = [];
  colorCodes = ['white', '#f28b82', '#f7bc04', '	#FFD700', '#FFA500', '#faf474', '#a7ffeb', '#cbf0f8', '#adcbfa', '#d7aefb', '#fdcfe8', '#cbb294'];
  paint: any;
  searchSection: number = 1;


  constructor(private route: Router, private snackbar: MatSnackBar, private appService: AppService
    , private dialog: MatDialog) { }

  ngOnInit() {
    this.create = new FormGroup(
      {
        title: new FormControl(''),
        description: new FormControl('')
      });

    this.searchNote = new FormGroup(
      {
        title: new FormControl('')
      });
      this.remindMe = new FormGroup(
        {
          dateTime: new FormControl('')
        });

    this.display();
    this.displayProfile();
    this.displayLabels();
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
    this.appService.regularNotes(localStorage.getItem('token')).subscribe
      (myNote => this.notes = myNote);

  }
  //display profile
  displayProfile() {
    this.appService.profile().subscribe(details => {
      this.profile = details
    }
    );
  }
  //upload pic displayPic() {this.appService.profilePic(localStorage.getItem('token').subscribe(details => {this.profile = details});}

  openDialog(myNote) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      noteid: myNote.noteid,
      title: myNote.title,
      color: myNote.color,
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
          this.create.reset();
        }
      }
    );
    this.popup = 1;
  }
  deleteNote(noteid) {
    this.appService.delete(localStorage.getItem('token'), noteid).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.display();
          this.snackbar.open("Note deleted successfully!!!!", "close", { duration: 8000 });
        }
      }
    );
  }
  //color note
  color(color, noteid) {
    this.appService.colorNote(localStorage.getItem('token'), color, noteid).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.display();
        }
      }
    );
  }
  //search note
  search() {
    this.appService.searchNote(localStorage.getItem('token'), this.searchNote.value).subscribe(
      note => {
        this.searchedNotes = note;
        this.searchSection = 2;
        if(this.searchNote.value==null)
        this.searchSection = 1;
      }
    );
  }
  //upload pic

  onSubmit(file: File) {

    // console.log(file);

    const formData = new FormData();
    formData.append('image', file);

    this.appService.uploadPhoto(formData, localStorage.getItem('token')).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Picture uploaded successfully!!!!", "close", { duration: 8000 });
          this.displayProfile();
        }
      });
  }

  //label
  addLabel(noteid): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      noteid: noteid
    };
    const dialogRef = this.dialog.open(AddLabelComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.displayLabels();
    });
   
  }
  //getAlllabels
  displayLabels() {
    this.appService.displayLabels(localStorage.getItem('token')).subscribe
      (labels => this.labels = labels);

  }
  //delete label
  deleteLabel() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteLabelComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.displayLabels();
    });

  }
  //collaborator
  addCollaborator(noteid){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width='500px';
    dialogConfig.data = {
      noteid: noteid
    };
    const dialogRef = this.dialog.open(CollabComponent, dialogConfig);
  }
//reminder
  reminder(noteid){
    this.appService.remindToNote(localStorage.getItem('token'),noteid, this.remindMe.value).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Reminser Set!!!!", "close", { duration: 8000 });
        }
      });
    }
//pin notes
pinNote(noteid)
{
  this.appService.pinningNotes(localStorage.getItem('token'),noteid).subscribe(
    (response: any) => {
      if (response.statusCode == 200) {
        this.snackbar.open("Note is pinned!", "close", { duration: 8000 });
        this.display();

      }
      else if (response.statusCode == 201) {
        this.snackbar.open("Note is unpinned!", "close", { duration: 8000 });
        this.display();
      }
    });
  }

  //archive note
  archiveNote(noteid)
{
  this.appService.archivingNotes(localStorage.getItem('token'),noteid).subscribe(
    (response: any) => {
      if (response.statusCode == 200) {
        this.snackbar.open("Note is archived!", "close", { duration: 8000 });
        this.display(); 
      }
      else if (response.statusCode == 201) {
        this.snackbar.open("Note is restored!", "close", { duration: 8000 });
      }
    });
  }

  //trash note
 trashNote(noteid)
{
  this.appService.trashingNotes(localStorage.getItem('token'),noteid).subscribe(
    (response: any) => {
      if (response.statusCode == 200) {
        this.snackbar.open("Note is in trash!", "close", { duration: 8000 });
        this.display(); 
      }
      else if (response.statusCode == 201) {
        this.snackbar.open("Note is restored!", "close", { duration: 8000 });
      }
    });
  }
}

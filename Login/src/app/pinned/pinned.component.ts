import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/service/app.service';
import { Note } from '../model/note';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Label } from '../model/label';
import { DialogComponent } from '../dialog/dialog.component';
import { AddLabelComponent } from '../add-label/add-label.component';
import { CollabComponent } from '../collab/collab.component';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements OnInit {
  notes: Array<Note>;
  remindMe: FormGroup;
  labels: Array<Label>;
  colorCodes = ['white', '#f28b82', '#f7bc04', '	#FFD700', '#FFA500', '#faf474', '#a7ffeb', '#cbf0f8', '#adcbfa', '#d7aefb', '#fdcfe8', '#cbb294'];
  paint: any;
  
  constructor(private appService:AppService,private snackbar:MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.display();
    this.remindMe = new FormGroup(
      {
        dateTime: new FormControl('')
      });
  }
//show pinned notes
display() {
  this.appService.pinnedNotes(localStorage.getItem('token')).subscribe
    (myNote => this.notes = myNote);

}
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
}

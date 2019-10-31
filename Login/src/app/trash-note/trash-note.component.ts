import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/service/app.service';
import { Note } from '../model/note';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-trash-note',
  templateUrl: './trash-note.component.html',
  styleUrls: ['./trash-note.component.css']
})
export class TrashNoteComponent implements OnInit {
  notes: Array<Note>;
  remindMe: FormGroup;
  constructor(private appService:AppService,private snackbar:MatSnackBar,private dialog:MatDialog) { }

  ngOnInit() {
    this.display();
    this.remindMe = new FormGroup(
      {
        dateTime: new FormControl('')
      });
  }
//show trash notes
display() {
  this.appService.trashedNotes(localStorage.getItem('token')).subscribe
    (myNote => this.notes = myNote);
}
//delete note
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
        this.display(); 
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
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from './material-module';
import { AppService } from 'src/service/app.service';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material";
import { AddLabelComponent } from './add-label/add-label.component';
import { DeleteLabelComponent } from './delete-label/delete-label.component';
import { CollabComponent } from './collab/collab.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PinnedComponent } from './pinned/pinned.component';
import { ArchieveComponent } from './archieve/archieve.component';
import { TrashNoteComponent } from './trash-note/trash-note.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeDashboardComponent,
    DialogComponent,
    AddLabelComponent,
    DeleteLabelComponent,
    CollabComponent,
    PinnedComponent,
    ArchieveComponent,
    TrashNoteComponent,
  ],

  imports:
    [
      BrowserModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      DemoMaterialModule,
      RouterModule,
      FlexLayoutModule,
      MatDialogModule,
      OwlDateTimeModule, 
      OwlNativeDateTimeModule
    ],
  providers: [AppService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent,AddLabelComponent,DeleteLabelComponent,CollabComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from 'src/app/model/register';
import { Note } from 'src/app/model/note';
import { Observable } from 'rxjs';


@Injectable()
export class AppService {
  baseurl = environment.baseUrl;

  constructor(private link: HttpClient) { }

  //Register a user
  public register(register: Register): Observable<any> {
    return this.link.post<any>(this.baseurl + 'register', register);
  }

  //Login user
  public login(register: Register): Observable<any> {
    return this.link.post<any>(this.baseurl + 'login', register);
  }

  //Forgot password
  public forgotPassword(register: Register): Observable<any> {
    return this.link.post<any>(this.baseurl + 'forgotpassword', register);
  }

  //Reset Password
  public resetPassword(register: Register): Observable<any> {
    return this.link.put<any>(this.baseurl + 'setPassword', register);
  }

  //Create a note
  public create(create: Note, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ token })
    };
    return this.link.post<any>(this.baseurl + 'createNote', create, httpOptions);
  }

  //Display all notes
  public display(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ token })
    };
    return this.link.get<any>(this.baseurl + 'getAllNotes/', httpOptions);
  }

  //Delete a note
  public delete(token: string, noteid: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('noteid', noteid)
    };
    return this.link.delete<any>(this.baseurl + 'deleteNote/', httpOptions);
  }

  //Update a note
  public update(token: string, create: Note,noteid: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('noteid', noteid)
    };
    return this.link.put<any>(this.baseurl + 'updateNote/',create, httpOptions);
  }
  //Reminder
  public remind(token: string,noteid: string,time:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('noteid', noteid),
      param:new HttpParams().set('time',time)
    };
    return this.link.put<any>(this.baseurl + 'updateNote/', httpOptions);
  }

}
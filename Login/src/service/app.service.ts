import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from 'src/app/model/register';
import { Note } from 'src/app/model/note';
import { Observable } from 'rxjs';
import { Search } from 'src/app/model/search';
import { Label } from 'src/app/model/label';
import { Collaborator } from 'src/app/model/collaborator';
import { Time } from '@angular/common';


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
    return this.link.get<any>(this.baseurl + 'getUnpinnedNotes', httpOptions);
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
 //display profile
 public profile(): Observable<any> {
  return this.link.get<any>(this.baseurl + 'getProfile/');
}

//colorNote
public colorNote(token: string, color: string,noteid: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token }),
    params: new HttpParams().set('noteid', noteid).set('color',color)
  };
  return this.link.put<any>(this.baseurl + 'colorNote/',color, httpOptions);
}
//search note
public searchNote(token: string, search: Search): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })
  };
  console.log(search.title);
  return this.link.post<any>(this.baseurl + 'searchNote/',search.title, httpOptions);
}
//uploadPic
public uploadPhoto(formData: FormData,token: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })
  };
  return this.link.post<any>(this.baseurl + 'uploadPic/',formData, httpOptions);
}
//Label
public creatingLabel(token: string,label: Label,noteId: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token }),
    params: new HttpParams().set('noteid', noteId)
  };
  return this.link.post<any>(this.baseurl + 'addLabelToNote/', label, httpOptions);
}
public displayLabels(token: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })
  };
  return this.link.get<any>(this.baseurl + 'getAllLabel/', httpOptions);
}

public displayLabelOfNote(token: string,noteId: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token }),
    params: new HttpParams().set('noteid', noteId)
  };
  return this.link.get<any>(this.baseurl + 'getLabelsByNoteid/', httpOptions);
}

//create only label
public createLabels(token: string,label: Label): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })
  };
  return this.link.post<any>(this.baseurl + 'createLabel/', label, httpOptions);
}

public deletelabels(token: string, labelId: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token }),
    params: new HttpParams().set('labelid', labelId)
  };
  return this.link.delete<any>(this.baseurl + 'deleteLabel/', httpOptions);
}

public updateLabels(token: string,labelid: string,label: Label): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token }),
    params: new HttpParams().set('labelid', labelid)
  };
  return this.link.put<any>(this.baseurl + 'updateLabel/',label, httpOptions);
}

public collaborator(token: string,noteId: string,email: Collaborator): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token }),
    params: new HttpParams().set('noteid', noteId)
  };
  return this.link.post<any>(this.baseurl + 'addCollaborator/',email, httpOptions);
}

public remindToNote(token: string,noteId: string,reminder:Time): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token }),
    params: new HttpParams().set('noteid', noteId)
  };
  return this.link.put<any>(this.baseurl + 'reminderToNote/',reminder, httpOptions);
}
//pin Note
public pinningNotes(token: string, noteId: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })
  };
  return this.link.put<any>(this.baseurl + 'pinAndUnpinNote/',noteId, httpOptions);
}
//show pinned notes
public pinnedNotes(token: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })  
  };
  return this.link.get<any>(this.baseurl + 'getPinnedNotes/', httpOptions);
}

//archive note

public archivingNotes(token: string, noteId: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })
  };
  return this.link.put<any>(this.baseurl + 'archiveNote/',noteId, httpOptions);
}
//show archived notes
public archivedNotes(token: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })  
  };
  return this.link.get<any>(this.baseurl + 'getArchiveNotes/', httpOptions);
}

// trash notes

public trashingNotes(token: string, noteId: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })
  };
  return this.link.put<any>(this.baseurl + 'trashUntrashNote/',noteId, httpOptions);
}

//show trash notes
public trashedNotes(token: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })  
  };
  return this.link.get<any>(this.baseurl + 'getTrashNotes/', httpOptions);
}
//show simple notes
public regularNotes(token: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ token })  
  };
  return this.link.get<any>(this.baseurl + 'getNotes/', httpOptions);
}

}

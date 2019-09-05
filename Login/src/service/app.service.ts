import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from 'src/app/model/register';
import { Observable } from 'rxjs';

@Injectable()
export class AppService 
{
  baseurl = environment.baseUrl;

  constructor(private link: HttpClient) { }
  
  public register(register:Register) : Observable<any>
  {
    return this.link.post<any>(this.baseurl+'register',register);
  }

  public login(register:Register) : Observable<any>
  {
    return this.link.post<any>(this.baseurl+'login',register);
  }
  
  public forgotPassword(register:Register) : Observable<any>
  {
    return this.link.post<any>(this.baseurl+'forgotpassword',register);
  }

  public resetPassword(register:Register ) : Observable<any>
  {
    return this.link.put<any>(this.baseurl+'setPassword',register);
  }

}
import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from 'src/app/model/register';
import { Observable } from 'rxjs';
import { Login } from 'src/app/model/login';
import { ForgotPassword } from 'src/app/model/forgot-password';
import { ResetPassword } from 'src/app/model/reset-password';

@Injectable()
export class AppService 
{
  baseurl = environment.baseUrl;

  constructor(private link: HttpClient) { }
  
  public register(register:Register) : Observable<any>
  {
    return this.link.post<any>(this.baseurl+'register',register);
  }

  public login(login:Login) : Observable<any>
  {
    return this.link.post<any>(this.baseurl+'login',login);
  }
  
  public forgotPassword(forgotpassword:ForgotPassword) : Observable<any>
  {
    return this.link.post<any>(this.baseurl+'forgotpassword',forgotpassword);
  }

  public resetPassword(resetpassword:ResetPassword ) : Observable<any>
  {
    return this.link.put<any>(this.baseurl+'setPassword',resetpassword);
  }

}
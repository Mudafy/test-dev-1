import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthData } from './login-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  LOGIN_URL = 'http://0.0.0.0:8000/auth/login';

  authToken: AuthData;
  constructor(private httpClient: HttpClient) { }

  login(email: string, password:string): Observable<AuthData> {
    return this.httpClient.post<AuthData>(this.LOGIN_URL, {"email": email, "password": password})
  }

  updateAuth(auth : AuthData){
    this.authToken = auth
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);

  private API_URL: string = 'http://localhost:4500/users/login';


  public postLogin(user: User): Observable<Token> {
    return this.httpClient.post<Token>(this.API_URL, user);
  }

}

export interface User {
  name: string;
  password: string;
}

export interface Token {
    token: string;
  }
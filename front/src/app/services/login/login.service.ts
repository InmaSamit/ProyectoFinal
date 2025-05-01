import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient = inject(HttpClient);

private API_URL: string =`${environment.apiUrl}/users`;


  public postLogin(user: User): Observable<Token> {
    return this.httpClient.post<Token>(`${this.API_URL}/login`, user);
  }

}

export interface User {
  name: string;
  password: string;
}

export interface Token {
    token: string;
  }
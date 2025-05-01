import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private API_URL = 'http://localhost:4500/interest';

  constructor(private http: HttpClient) {}

  getInterests(): Observable<Interest[]> {
    return this.http.get<Interest[]>(this.API_URL);
  }

  getInterestById(id: number): Observable<Interest> {
    return this.http.get<Interest>(`${this.API_URL}/${id}`);
  }

  createInterest(interest: Interest): Observable<Interest> {
    return this.http.post<Interest>(this.API_URL, interest);
  }

  deleteInterest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

export interface Interest {
  id: number;
  title: string;
  description: string;
}
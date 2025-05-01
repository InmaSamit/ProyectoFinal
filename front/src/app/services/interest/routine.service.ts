// src/app/services/routine.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Routine {
  id?: number;
  user_id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class RoutineService {
  private API_URL: string = `${environment.apiUrl}/routine`;

  constructor(private http: HttpClient) { }

  create(routine: Routine): Observable<Routine> {
    return this.http.post<Routine>(this.API_URL, routine);
  }
  getByUser(): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${this.API_URL}`);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

// src/app/services/routine-task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RoutineTask {
  id?: number;
  routine_id: number;
  task_id: number;
  title?: string;
  description?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

@Injectable({ providedIn: 'root' })
export class RoutineTaskService {
  private API_URL: string = `${environment.apiUrl}/routine-task`;

  constructor(private http: HttpClient) {}
  
  getByRoutine(routineId: number): Observable<RoutineTask[]> {
    return this.http.get<RoutineTask[]>(`${this.API_URL}/routine/${routineId}`);
  }
  

  create(task: Partial<RoutineTask>): Observable<any> {
    return this.http.post(`${this.API_URL}`, task);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}


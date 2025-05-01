// src/app/services/routine-task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:4500/routine-task';

  constructor(private http: HttpClient) {}
  
  getByRoutine(routineId: number): Observable<RoutineTask[]> {
    return this.http.get<RoutineTask[]>(`${this.apiUrl}/routine/${routineId}`);
  }
  

  create(task: Partial<RoutineTask>): Observable<any> {
    return this.http.post(`${this.apiUrl}`, task);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}


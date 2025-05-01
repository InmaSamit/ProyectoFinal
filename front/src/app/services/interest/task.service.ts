// src/app/services/task/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = 'http://localhost:4500/task';

  constructor(private http: HttpClient) {}

  getTasksByGoal(goalId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL}/${goalId}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

export interface Task {
  id?: number;
  goal_id: number;
  title: string;
  description: string;
  duration_minutes: number;
}

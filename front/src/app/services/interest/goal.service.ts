import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GoalService {

  private API_URL: string = `${environment.apiUrl}/goal`;

  constructor(private http: HttpClient) { }

  getGoalsByInterest(interestId: number): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.API_URL}/interest/${interestId}`);
  }

  deleteGoal(goalId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${goalId}`);
  }

  createGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.API_URL, goal);
  }
}
export interface Goal {
  id?: number;
  title: string;
  description: string;
  interest_id: number;
}
